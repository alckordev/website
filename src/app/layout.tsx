import "@mantine/core/styles.css";
import "@/assets/css/global.css";
import { Box, ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
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
          <Header />
          <Box>{children}</Box>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
