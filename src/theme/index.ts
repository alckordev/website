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
import ActionIcon from "./components/action-icon";
import TextInput from "./components/text-input";
import Checkbox from "./components/checkbox";
import Spotlight from "./components/spotlight";
import MenuDropdown from "./components/menu/dropdown";
import MenuDivider from "./components/menu/divider";
import MenuItem from "./components/menu/item";

export default createTheme({
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
    ActionIcon,
    TextInput,
    Checkbox,
    Spotlight,
    MenuDropdown,
    MenuDivider,
    MenuItem,
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
