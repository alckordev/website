"use client";

import { MantineProvider } from "@mantine/core";
import { theme } from "@/theme/mantine";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="dark"
      withGlobalClasses
      withStaticClasses
    >
      {children}
    </MantineProvider>
  );
};
