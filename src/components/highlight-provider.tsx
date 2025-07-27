"use client";

import {
  CodeHighlightAdapterProvider,
  createShikiAdapter,
} from "@mantine/code-highlight";
import { bundledLanguages } from "shiki";

async function loadShiki() {
  const { createHighlighter } = await import("shiki");
  const shiki = await createHighlighter({
    langs: Object.keys(bundledLanguages),
    themes: ["catppuccin-frappe"],
  });

  return shiki;
}

const shikiAdapter = createShikiAdapter(loadShiki, {
  // Force Shiki to use our custom theme; cast quiets the `'dark' | 'light'` TS check.
  forceColorScheme: "catppuccin-frappe" as "dark",
});

export const HighlightProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CodeHighlightAdapterProvider adapter={shikiAdapter}>
      {children}
    </CodeHighlightAdapterProvider>
  );
};
