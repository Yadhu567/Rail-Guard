import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './header';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignin = async () => {
    setError(''); 
    try {
      const response = await axios.post('http://localhost:3000/signin', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/alert'); 
    } catch (error) {
      setError('Signin failed. ' + (error.response?.data || ''));

    }
  };

  const bg = useColorModeValue('white', 'gray.800');
  const boxShadow = useColorModeValue('lg', 'dark-lg');

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Header />
      <VStack spacing={4} p={8} maxWidth="500px" mx="auto" mt="7vh" bg={bg} boxShadow={boxShadow} borderRadius="md">
        <Heading as="h1" size="lg" mb={4} color={useColorModeValue('teal.600', 'teal.200')}>
          Sign in to Your Account
        </Heading>
        {error && <Text color="red.500">{error}</Text>}
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button colorScheme="teal" size="lg" width="full" mt={4} onClick={handleSignin}>
          Sign In
        </Button>
        <Text mt={4}>
          Don't have an account?{' '}
          <Link color="teal.500" href="/signup">
            Sign Up
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default Signin;
