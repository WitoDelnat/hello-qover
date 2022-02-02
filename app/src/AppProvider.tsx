import { ChakraProvider } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export function AppProvider({ children }: { children: ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
