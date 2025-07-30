"use client";

import { MantineProvider } from "@mantine/core";
import { emotionTransform, MantineEmotionProvider } from "@mantine/emotion";
import theme from "@/theme";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="dark"
      stylesTransform={emotionTransform}
      withGlobalClasses
      withStaticClasses
    >
      <MantineEmotionProvider>{children}</MantineEmotionProvider>
    </MantineProvider>
  );
};
