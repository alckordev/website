import "@mantine/core/styles.css";
import "@/assets/css/global.css";
import {
  Box,
  ColorSchemeScript,
  Container,
  mantineHtmlProps,
} from "@mantine/core";
import { Provider } from "@/components/provider";
import { Footer, Header } from "@/components/layouts";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <Provider>
          <Box
            bg="linear-gradient(to bottom, var(--mantine-accent-surface), transparent)"
            pos="absolute"
            left={0}
            right={0}
            h={480}
            style={{ zIndex: -1 }}
          />
          <Header />
          <Box component="main">
            <Container size="xl" h="100%">
              {children}
            </Container>
          </Box>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
