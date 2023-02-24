import type { AppProps } from "next/app";
import { ThemeProvider, theme } from "@myth/ui";

import "@myth/ui/src/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
