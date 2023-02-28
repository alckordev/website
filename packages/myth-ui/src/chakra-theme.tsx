import {
  ChakraProvider,
  extendTheme,
  createLocalStorageManager,
  useColorModeValue,
} from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      900: "#0B5345",
      800: "#0E6655",
      700: "#117A65",
      600: "#138D75",
      500: "#16A085",
      400: "#45B39D",
      300: "#73C6B6",
      200: "#A2D9CE",
      100: "#D0ECE7",
    },
  },
  fonts: {
    heading: "Poppins",
    body: "IBM Plex Sans",
  },
  sizes: {
    container: {
      "2xl": "1440px",
    },
  },
  config: {
    initialColorMode: "dark",
  },
});

export {
  ChakraProvider as ThemeProvider,
  createLocalStorageManager,
  theme,
  useColorModeValue,
};
