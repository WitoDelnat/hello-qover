import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ReactNode, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { Navigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../../auth/useAuth";
import codeOverlayUrl from "../../code-overlay.png";
import { LogoutButton } from "../../components/LogoutButton";

type FormValues = z.infer<typeof FormValues>;
const FormValues = z.object({
  driverAge: z.number(),
  carBrand: z.enum(["audi", "bmw", "porchse"]),
  carValue: z.number(),
});

export function CarQuotePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormValues),
  });
  const calculateQuote = useCalculateQuote();
  const errorMessage =
    errors["driverAge"]?.message ??
    errors["carValue"]?.message ??
    errors["carBrand"]?.message;

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        const plans = await calculateQuote.mutateAsync(values);
        navigate("/insurance/plans", {
          state: {
            plans,
          },
        });
      } catch (err) {
        switch (err instanceof Error ? err.message : "unexpected_error") {
          case "driver_too_young":
            return setError("driverAge", {
              message: "Sorry! The driver is too young.",
            });
          case "car_value_too_low":
            return setError("carValue", {
              message: "Sorry! The price of the car is too low.",
            });
          case "unacceptable_risk":
            return setError("carBrand", {
              message: "Sorry! We can not accept this particular risk.",
            });
          default:
            return setError("driverAge", {
              message: "Sorry! An unexpected problem occurred.",
            });
        }
      }
    },
    [calculateQuote, setError, navigate]
  );

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />;
  }

  return (
    <Layout>
      <Center h="100%">
        <Box
          rounded="3px"
          mx="auto"
          spacing="5"
          mt="30px"
          w="935px"
          bgColor="white"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack w="495px" mx="auto" py="60px" alignItems="start">
              <FormControl>
                <HStack>
                  <FormLabel w="150px" fontSize="15px" color="gray.800">
                    Age of the driver
                  </FormLabel>
                  <Input
                    {...register("driverAge", { valueAsNumber: true })}
                    type="number"
                    height="40px"
                    width="80px"
                    errorBorderColor="red.100"
                  />
                </HStack>
              </FormControl>

              <FormControl>
                <HStack>
                  <FormLabel
                    flexShrink="0"
                    w="150px"
                    fontSize="15px"
                    color="gray.800"
                  >
                    Car
                  </FormLabel>

                  <Select
                    {...register("carBrand")}
                    iconColor="teal.100"
                    errorBorderColor="red.100"
                  >
                    <option value="audi">Audi</option>
                    <option value="bmw">BMW</option>
                    <option value="porche">Porche</option>
                  </Select>
                </HStack>
              </FormControl>

              <FormControl>
                <HStack>
                  <FormLabel w="150px" fontSize="15px" color="gray.800">
                    Purchase price
                  </FormLabel>

                  <Input
                    {...register("carValue", { valueAsNumber: true })}
                    type="number"
                    height="40px"
                    width="80px"
                    errorBorderColor="red.100"
                  />
                  <Text>€</Text>
                </HStack>
              </FormControl>

              {errorMessage ? (
                <HStack>
                  <Box w="160px" />
                  <Text color="red.100">{errorMessage}</Text>
                </HStack>
              ) : null}

              <HStack pt="8">
                <Button
                  type="submit"
                  ml="170px"
                  p="16px 41px 15px 40px"
                  width="100%"
                  height="45px"
                  colorScheme="blue"
                  bgColor="teal.100"
                >
                  Get a price
                </Button>
              </HStack>
            </VStack>
          </form>
        </Box>
      </Center>
    </Layout>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      display="flex"
      flexDir="column"
      w="100%"
      h="100%"
      backgroundImage={`url(${codeOverlayUrl}), linear-gradient(122deg, #317bda -6%, #33c3c8)`}
      backgroundSize="cover"
    >
      <Box
        position="absolute"
        width="100%"
        display="flex"
        flexDir="row-reverse"
        p="3"
      >
        <LogoutButton />
      </Box>

      {children}
    </Box>
  );
}

// Case note: Not really happy with porting these types manually
// However, a better setup goes beyond the timebox for this case.
export type Plans = z.infer<typeof Plans>;
export const Plans = z.object({
  universal: z.object({
    monthly: z.number(),
    yearly: z.number(),
  }),
  global: z.object({
    monthly: z.number(),
    yearly: z.number(),
  }),
});

function useCalculateQuote() {
  const { accessToken } = useAuth();

  return useMutation(async (values: FormValues) => {
    const request = await fetch("http://localhost:8080/api/quote", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!request.ok) {
      throw new Error("");
    }

    const body = await request.json();
    return Plans.parse(body);
  });
}
