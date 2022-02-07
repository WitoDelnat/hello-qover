import { Center, Box, Heading, Link as ChakraLink } from "@chakra-ui/react";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export function NotFoundPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />;
  }

  return (
    <Box as="main" mx="auto" maxW="5xl">
      <Center
        flexDir="column"
        mt="68px"
        p="12"
        h="sm"
        borderWidth="1px"
        borderColor="white"
        borderRadius="md"
      >
        <Heading size="md">Page not found.</Heading>
        <ChakraLink as={Link} to="/insurance/quote">
          Click here to go to quick quote for car insurances.
        </ChakraLink>
      </Center>
    </Box>
  );
}
