import type { AppProps } from "next/app";
import { ThemeProvider, theme } from "@myth/ui";
import { AuthProvider } from "../store/AuthProvider";

import "@myth/ui/src/fonts";
import "../styles/prism-night-owl.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}
