import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'; 
import ReactDOM from 'react-dom'; 
import Signin from './signin';
import Signup from './signup';
import Landing from './landing';
import Alert from './alert';
import History from './history';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/signin" />
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/alert" element={<PrivateRoute element={<Alert />} />} />
          <Route path="/history" element={<PrivateRoute element={<History />} />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
