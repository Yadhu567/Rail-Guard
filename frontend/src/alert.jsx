import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Text, Image, Button, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './header';

const Alert = () => {
  const [latestPrediction, setLatestPrediction] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestPrediction = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/latest-prediction', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLatestPrediction(response.data);
      } catch (error) {
        console.error('Error fetching latest prediction:', error);
      }
    };

    fetchLatestPrediction();
  }, []);

  const bg = useColorModeValue('white', 'gray.800');
  const boxShadow = useColorModeValue('lg', 'dark-lg');
  const headingColor = useColorModeValue('teal.600', 'teal.200');

  const renderPredictionDetails = () => {
    if (!latestPrediction) {
      return <Text>No animal detected near railway track</Text>;
    }

    const { documentno, area_name, animal_name, confidence, time, no_detection, animal_image } = latestPrediction;

    if (documentno === 'second') {
      return (
        <Box p={4} borderWidth="1px" borderRadius="md" w="100%" bg={useColorModeValue('green.100', 'green.700')}>
          <Text>{no_detection}</Text>
        </Box>
      );
    } else {
      return (
        <Box
          p={4}
          borderWidth="1px"
          borderRadius="md"
          w="100%"
          bg={useColorModeValue('red.100', 'red.700')}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Text><strong>Area:</strong> {area_name}</Text>
          <Text><strong>Animal:</strong> {animal_name}</Text>
          <Text><strong>Confidence:</strong> {confidence}</Text>
          <Text><strong>Time:</strong> {time}</Text>
          {animal_image && (
            <Image
              src={`data:image/jpeg;base64,${animal_image}`}
              alt="Animal"
              borderRadius="md"
              mt={4}
              boxSize="150px"
              maxHeight="150px"
              objectFit="cover"
            />
          )}
        </Box>
      );
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} p={1}>
      <Header />
      <VStack
        spacing={4}
        maxWidth="600px"
        mx="auto"
        mt={8}
        p={4}
        bg={bg}
        boxShadow={boxShadow}
        borderRadius="md"
        alignItems="center"
      >
        <Heading color={headingColor}>Animal Alert!</Heading>
        {renderPredictionDetails()}
        <Button colorScheme="teal" mt={4} onClick={() => navigate('/history')}>Go to History</Button>
      </VStack>
    </Box>
  );
};

export default Alert;
