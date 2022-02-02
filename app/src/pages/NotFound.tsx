import { Center, Box, Heading, Link as ChakraLink } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
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
        <ChakraLink as={Link} to="/">
          Click here to return to the homepage.
        </ChakraLink>
      </Center>
    </Box>
  );
}
