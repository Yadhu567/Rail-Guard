import React from 'react';
import { Flex, Button, HStack, Image, Text, useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import Logo from './assets/logo.png';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("#FBFBFB", "#1A202C"); // Light mode background, Dark mode background
  const color = useColorModeValue("#0F342E", "#CBD5E0"); // Light mode text color, Dark mode text color

  return (
    <Flex w="100%" bg={bg} boxShadow="md" p="10px 20px">
      <HStack w="100%" justifyContent="space-between">
        <HStack spacing="15px">
          <Link to="/">
            <Image src={Logo} alt="Logo" boxSize="50px" />
          </Link>
          <Link to="/">
            <Text fontSize="28px" fontWeight="bold" color="#2b6cb0">
              RAIL GUARD
            </Text>
          </Link>
        </HStack>
        <HStack spacing={6}>
          <Link to="/">
            <Button
              variant="ghost"
              _hover={{ bg: "#3182ce", color: "white" }}  
              _active={{ bg: "#2b6cb0", color: "white" }} 
              color={color}
            >
              Home
            </Button>
          </Link>
          <Link to="/signin">
            <Button
              variant="ghost"
              _hover={{ bg: "#3182ce", color: "white" }}  
              _active={{ bg: "#2b6cb0", color: "white" }} 
              color={color}
            >
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              variant="ghost"
              _hover={{ bg: "#3182ce", color: "white" }}  
              _active={{ bg: "#2b6cb0", color: "white" }} 
              color={color}
            >
              Sign Up
            </Button>
          </Link>
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            color={color}
            variant="ghost"
            _hover={{ bg: "#3182ce", color: "white" }}
            _active={{ bg: "#2b6cb0", color: "white" }}
          />
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Header;
