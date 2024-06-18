const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors())
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.listen(3000, () => {
  console.log('Server running on port 3000');
});

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  await user.save();

  res.status(201).send('User created');
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('All fields are required');
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).send('Invalid email or password');
  }

  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');

  res.send({ token });
});

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const verified = jwt.verify(token, 'your_jwt_secret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

app.get('/latest-prediction', authenticateJWT, async (req, res) => {
  const user = await User.findById(req.user.userId);

  if (!user || user.detections.length === 0) {
    return res.status(404).send('No predictions found');
  }

  const latestPrediction = user.detections[user.detections.length - 1];

  res.send(latestPrediction);
});

app.get('/all-predictions', authenticateJWT, async (req, res) => {
  const user = await User.findById(req.user.userId);

  if (!user) {
    return res.status(404).send('No predictions found');
  }

  res.send(user.detections);
});
