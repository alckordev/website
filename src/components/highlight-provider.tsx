"use client";

import {
  CodeHighlightAdapterProvider,
  createShikiAdapter,
} from "@mantine/code-highlight";
import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

const highlighterPromise = createHighlighterCore({
  langs: [
    import("@shikijs/langs/typescript"),
    import("@shikijs/langs/javascript"),
    import("@shikijs/langs/bash"),
    import("@shikijs/langs/tsx"),
    import("@shikijs/langs/csharp"),
  ],
  themes: [import("@shikijs/themes/catppuccin-frappe")],
  engine: createJavaScriptRegexEngine(),
});

function loadShiki() {
  return highlighterPromise;
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
