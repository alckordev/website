"use client";

import { createTheme } from "@mantine/core";
import { Fira_Code, Montserrat, Roboto } from "next/font/google";

const heading = Montserrat({ subsets: ["latin"] });
const text = Roboto({ subsets: ["latin"] });
const code = Fira_Code({ subsets: ["latin"] });

export const theme = createTheme({
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
      "#fef2f5",
      "#eae6e7",
      "#d6d6d6",
      "#b2b2b2",
      "#9a9a9a",
      "#8b8b8b",
      "#848484",
      "#717171",
      "#676465",
      "#5e5457",
    ],
  },

  fontFamily: text.style.fontFamily,

  fontFamilyMonospace: code.style.fontFamily,

  headings: {
    fontFamily: heading.style.fontFamily,
  },

  primaryColor: "accent",
});
