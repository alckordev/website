import {
  ChakraProvider,
  extendTheme,
  createLocalStorageManager,
} from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "grayblue.900",
        color: "grayblue.100",
      },
    },
  },
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
    secondary: {
      900: "#202225",
      500: "#2A2D31",
      100: "#3B3F45",
    },
    grayblue: {
      900: "#17202A",
      800: "#1C2833",
      700: "#212F3D",
      600: "#273746",
      500: "#2C3E50",
      400: "#566573",
      300: "#808B96",
      200: "#ABB2B9",
      100: "#D5D8DC",
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
});

export { ChakraProvider as ThemeProvider, createLocalStorageManager, theme };
