"use client";

import { createTheme } from "@mantine/core";
// Foundations
import colors from "./foundations/colors";
import fonts from "./foundations/fonts";
// Components
import Loader from "./components/loader";
import LoadingOverlay from "./components/loading-overlay";
import Divider from "./components/divider";
import ModalContent from "./components/modal/content";
import ModalHeader from "./components/modal/header";
import ModalCloseButton from "./components/modal/close-button";
import Title from "./components/title";
import Card from "./components/card";
import Code from "./components/code";
import CodeHighlight from "./components/code-highlight";
import Button from "./components/button";

export default createTheme({
  // focusRing: "never",
  defaultRadius: "lg",
  components: {
    Loader,
    Divider,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    LoadingOverlay,
    Title,
    Card,
    Code,
    CodeHighlight,
    Button,
  },
  colors,
  fontFamily: fonts.body,
  fontFamilyMonospace: fonts.mono,
  headings: {
    fontFamily: fonts.heading,
  },
  primaryColor: "brand-blue",
  primaryShade: 9,
});
