import { extendTheme } from "@chakra-ui/react";

export type Theme = typeof theme;

export const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: "false",
  styles: {
    global: {
      "html, body": {
        height: "100%",
      },
      "#root": {
        height: "100%",
      },
    },
  },
});
