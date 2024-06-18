import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Text, Image, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import Header from './header';

const History = () => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/all-predictions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPredictions(response.data);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      }
    };

    fetchPredictions();
  }, []);

  const bg = useColorModeValue('white', 'gray.800');
  const boxShadow = useColorModeValue('lg', 'dark-lg');
  const headingColor = useColorModeValue('teal.600', 'teal.200');

  return (
    <Box  minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} p={1}>
      <Header />
      <VStack spacing={4} maxWidth="700px" mx="auto" mt={8} p={4} bg={bg} boxShadow={boxShadow} borderRadius="md">
        <Heading color={headingColor}>All Time Detections!</Heading>
        {predictions.filter(prediction => prediction.documentno === 'first').length > 0 ? (
          predictions.filter(prediction => prediction.documentno === 'first').map((prediction, index) => (
            <Box
              key={index}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              w="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              bg={bg}
              boxShadow={boxShadow}
            >
              <Text><strong>Area:</strong> {prediction.area_name}</Text>
              <Text><strong>Animal:</strong> {prediction.animal_name}</Text>
              <Text><strong>Confidence:</strong> {prediction.confidence}</Text>
              <Text><strong>Time:</strong> {prediction.time}</Text>
              {prediction.animal_image && (
                <Image
                  src={`data:image/jpeg;base64,${prediction.animal_image}`}
                  alt="Animal"
                  borderRadius="md"
                  mt={4}
                  boxSize="150px"
                  maxHeight="150px"
                  objectFit="cover"
                />
              )}
            </Box>
          ))
        ) : (
          <Text>No predictions available!</Text>
        )}
      </VStack>
    </Box>
  );
};

export default History;
