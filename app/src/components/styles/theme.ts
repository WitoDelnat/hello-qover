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
  colors: {
    gray: {
      800: "#5b7289",
      900: "#484848",
    },
    blue: {
      100: "#317bda",
    },
    teal: {
      100: "#33c3c8",
    },
    red: {
      100: "#ee3d57",
    },
  },
});
