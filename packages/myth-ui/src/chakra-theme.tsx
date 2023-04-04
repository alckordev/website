import {
  ChakraProvider,
  extendTheme,
  createLocalStorageManager,
} from "@chakra-ui/react";
import { StyleConfig } from "@chakra-ui/theme-tools";

const components: Record<string, StyleConfig> = {
  Button: {
    baseStyle: () => ({
      fontWeight: "medium",
    }),
  },
  Drawer: {
    baseStyle: ({ colorMode }) => ({
      dialog: {
        bg: colorMode === "dark" ? "gray.928" : "white",
      },
    }),
  },
  Modal: {
    baseStyle: ({ colorMode }) => ({
      dialog: {
        bg: colorMode === "dark" ? "gray.928" : "white",
      },
    }),
  },
};

const theme = extendTheme({
  breakpoints: {
    sm: "30em",
    md: "46em",
    lg: "56em",
    xl: "80em",
    "2xl": "96em",
  },
  colors: {
    gray: {
      958: "#0e1013",
      928: "#17181b",
      900: "#202124",
      868: "#282a2d",
      846: "#2e3134",
      800: "#3c4043",
      700: "#5f6368",
      600: "#80868b",
      500: "#9aa0a6",
      400: "#bdc1c6",
      300: "#dadce0",
      200: "#e8eaed",
      100: "#f1f3f4",
      50: "#f8f9fa",
    },
  },
  fonts: {
    heading: "Poppins",
    body: "IBM Plex Sans",
  },
  sizes: {
    container: {
      "2xl": "1336px",
    },
  },
  semanticTokens: {
    colors: {
      "chakra-body-bg": {
        _dark: "gray.928",
      },
    },
  },
  config: {
    initialColorMode: "dark",
  },
  components,
});

// console.log("theme", theme);

export { ChakraProvider as ThemeProvider, createLocalStorageManager, theme };
