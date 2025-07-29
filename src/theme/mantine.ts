"use client";

import {
  Button,
  createTheme,
  Divider,
  Input,
  Loader,
  LoadingOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  TextInput,
} from "@mantine/core";
import { Fira_Code, Montserrat, Roboto } from "next/font/google";
import { InfinityLoader, RingLoader } from "./components";

const heading = Montserrat({ subsets: ["latin"] });
const text = Roboto({ subsets: ["latin"] });
const code = Fira_Code({ subsets: ["latin"] });

export const theme = createTheme({
  focusRing: "never",

  defaultRadius: "md",

  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: {
          ...Loader.defaultLoaders,
          ring: RingLoader,
          infinity: InfinityLoader,
        },
        type: "ring",
      },
    }),
    Divider: Divider.extend({
      defaultProps: {
        color: "var(--mantine-accent-surface)",
      },
    }),
    ModalContent: ModalContent.extend({
      defaultProps: {
        bg: "var(--mantine-accent-background)",
        bd: "1 solid var(--mantine-accent-surface)",
      },
    }),
    ModalHeader: ModalHeader.extend({
      defaultProps: {
        bg: "var(--mantine-accent-background)",
      },
    }),
    ModalCloseButton: ModalCloseButton.extend({
      defaultProps: {
        variant: "light",
      },
    }),
    LoadingOverlay: LoadingOverlay.extend({
      styles: {
        overlay: {
          "--overlay-bg": "var(--mantine-accent-backdrop)",
        },
      },
    }),
    Button: Button.extend({
      defaultProps: {},
    }),
    Input: Input.extend({
      defaultProps: {},
    }),
    TextInput: TextInput.extend({
      defaultProps: {},
    }),
  },

  colors: {
    accent: [
      "#e1f8ff",
      "#cbedff",
      "#9ad7ff",
      "#64c1ff",
      "#3aaefe",
      "#20a2fe",
      "#0099ff",
      "#0088e4",
      "#0079cd",
      "#0069b6",
    ],
    gray: [
      "#fcf9fa",
      "#f9f3f4",
      "#e2e8f0",
      "#cad5e2",
      "#90a1b9",
      "#62748e",
      "#45556c",
      "#314158",
      "#1d293d",
      "#020618",
    ],
  },

  fontFamily: text.style.fontFamily,

  fontFamilyMonospace: code.style.fontFamily,

  headings: {
    fontFamily: heading.style.fontFamily,
  },

  primaryColor: "accent",

  primaryShade: 9,
});
