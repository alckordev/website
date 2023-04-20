import type { AppProps } from "next/app";
import { ThemeProvider, theme } from "@myth/ui";
import { Analytics } from "@vercel/analytics/react";
import { AuthContextProvider } from "../store/AuthContextProvider";

import "@myth/ui/src/fonts";
import "../styles/prism-night-owl.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
    </AuthContextProvider>
  );
}
