// models/user.js
const mongoose = require('mongoose');

const DetectionSchema = new mongoose.Schema({
    documentno: String,
    area_name: String,
    animal_name: String,
    confidence: Number,
    time: String,
    animal_image: String,
    sound_file: String,
    no_detection: String
}, { _id: false });

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    detections: [DetectionSchema]
});

module.exports = mongoose.model('User', UserSchema, 'users');
