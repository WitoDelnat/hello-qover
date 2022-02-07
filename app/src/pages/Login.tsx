import React, { useCallback, useState } from "react";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

type FormValues = z.infer<typeof FormValues>;
const FormValues = z.object({
  username: z.string(),
  password: z.string(),
});

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(FormValues),
  });

  const submit = useCallback(
    async ({ username, password }: FormValues) => {
      try {
        setLoading(true);
        setError(false);
        await login(username, password);
        navigate("/insurance/quote");
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [login]
  );

  return (
    // Case note: Normally I'd split this up in a layout or more modular components but my time box is running out.
    <Box
      display="flex"
      flexDir="column"
      w="100%"
      h="100%"
      // Case note: theme colors do not work here and bgGradient deviates too much
      backgroundImage="linear-gradient(122deg, #317bda -6%, #33c3c8)"
    >
      <VStack spacing="5" flex="1 0 auto">
        <QoverLogo color="white" mt="90px" />

        <form onSubmit={handleSubmit(submit)}>
          <VStack
            rounded="3px"
            px="5"
            pb="5"
            spacing="5"
            mt="30px"
            w="350px"
            bgColor="white"
          >
            <Heading mt="30px" mx="auto" color="gray.800" fontSize="18px">
              Welcome at Qover
            </Heading>

            <FormControl>
              <FormLabel fontSize="10px" color="gray.800">
                Username
              </FormLabel>
              <Input
                {...register("username")}
                variant="flushed"
                borderBottomColor="blue.100"
                borderBottomWidth="2px"
                height="28px"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="10px" color="gray.800">
                Password
              </FormLabel>
              <Input
                {...register("password")}
                variant="flushed"
                type="password"
                borderBottomColor="blue.100"
                borderBottomWidth="2px"
                height="28px"
              />
            </FormControl>

            {error ? (
              <Text color="red.500">
                Your username or password is incorrect.
              </Text>
            ) : null}

            <Button
              type="submit"
              width="100%"
              height="45px"
              colorScheme="blue"
              bgColor="blue.100"
              isLoading={loading}
            >
              Sign in to your account
            </Button>
          </VStack>
        </form>

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
