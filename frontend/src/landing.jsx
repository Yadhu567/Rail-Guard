import React from 'react';
import { Box, Button, Heading, Text, VStack, Flex, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Header from './header';
import landingImage from './assets/home.jfif';  

const Landing = () => {
  const bg = useColorModeValue("#F7FAFC", "#1A202C");
  const textColorPrimary = useColorModeValue("#2D3748", "#E2E8F0");
  const textColorSecondary = useColorModeValue("#4A5568", "#A0AEC0");

  return (
    <Box
      bg={`url(${landingImage})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      minH="100vh"
    >
      <Header />
      <Flex 
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="center"
        p={8}
        h="calc(100vh - 70px)"
        bg={bg}
        bgColor="rgba(0, 0, 0, 0.5)"
        bgBlendMode="overlay"
      >
        <VStack 
          spacing={4} 
          align="center"
          w={{ base: '100%', md: '50%' }}
          p={{ base: 4, md: 8 }}
          textAlign="center"
        >
          <Text fontSize={{ base: 'md', md: 'lg' }} color="#2B6CB0">
            WELCOME TO RAIL GUARD
          </Text>
          <Heading fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold" color={textColorPrimary}>
            Platform for Rail Safety!
          </Heading>
          <Text fontSize={{ base: 'sm', md: 'md' }} color={textColorSecondary}>
            This platform helps monitor animal activities near railway tracks to ensure safety near railway tracks.
          </Text>
          <Flex justify="center">
            <Link to="/signin">
              <Button colorScheme="blue" mr={4}>Get Started</Button>
            </Link>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Landing;
