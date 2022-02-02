import React from "react";
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Text,
  chakra,
  Button,
  Center,
} from "@chakra-ui/react";
import { QoverLogo } from "../components/icons/QoverLogo";

export function LoginPage() {
  return (
    <Box
      display="flex"
      flexDir="column"
      w="100%"
      h="100%"
      backgroundImage="linear-gradient(122deg, #317bda -6%, #33c3c8)"
    >
      <VStack spacing="5" flex="1 0 auto">
        <QoverLogo color="white" mt="90px" />

        <VStack
          rounded="3px"
          px="5"
          pb="5"
          spacing="5"
          mt="30px"
          w="350px"
          bgColor="white"
        >
          <Heading mt="30px" mx="auto" color="#5b7289" fontSize="18px">
            Welcome at Qover
          </Heading>

          <FormControl>
            <FormLabel fontSize="10px" color="#5b7289">
              Email
            </FormLabel>
            <Input
              variant="flushed"
              borderBottomColor="#317bda"
              borderBottomWidth="2px"
              height="28px"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="10px" color="#5b7289">
              Password
            </FormLabel>
            <Input
              variant="flushed"
              borderBottomColor="#317bda"
              borderBottomWidth="2px"
              height="28px"
            />
          </FormControl>

          <Button
            width="100%"
            height="45px"
            colorScheme="blue"
            bgColor="#317bda"
          >
            Sign in to your account
          </Button>
        </VStack>

        <Box mt="20px" width="350px" borderRadius="3px" border="solid 1px #fff">
          <Text py="3" color="white" textAlign="center">
            Don't have an account?{" "}
            <chakra.span textDecoration="underline" cursor="pointer">
              Ask access
            </chakra.span>
          </Text>
        </Box>
      </VStack>

      <Box h="12" borderTop="solid 1px rgba(255, 255, 255, 0.2);">
        <Center color="white" h="100%">
          © Qover 2017
        </Center>
      </Box>
    </Box>
  );
}
