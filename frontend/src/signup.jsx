import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './header'; 

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError('');
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
    
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/signup', { name, email, password });
      navigate('/signin'); 
    } catch (error) {
      setError('Signup failed. ' + (error.response?.data || ''));
    }
  };

  const bg = useColorModeValue('white', 'gray.800');
  const boxShadow = useColorModeValue('lg', 'dark-lg');

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Header />
      <VStack spacing={2} p={8} maxWidth="500px" mx="auto" mt="6vh" bg={bg} boxShadow={boxShadow} borderRadius="md">
        <Heading as="h1" size="lg" mb={4} color={useColorModeValue('teal.600', 'teal.200')}>
          Create an Account
        </Heading>
        {error && <Text color="red.500">{error}</Text>}
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button colorScheme="teal" size="lg" width="full" mt={4} onClick={handleSignup}>
          Sign Up
        </Button>
        <Text mt={4}>
          Already have an account?{' '}
          <Link color="teal.500" href="/signin">
            Sign In
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default Signup;
