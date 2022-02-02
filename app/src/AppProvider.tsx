import { ChakraProvider } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { theme } from "./components/styles/theme";

export function AppProvider({ children }: { children: ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
