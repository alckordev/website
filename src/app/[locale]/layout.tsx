import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import "@/assets/css/global.css";
import {
  Box,
  ColorSchemeScript,
  Container,
  mantineHtmlProps,
} from "@mantine/core";
import { Provider } from "@/components/provider";
import { Footer, Header } from "@/components/layouts";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Alckor DEV — Software developer",
  description: "I have followed setup instructions carefully",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <NextIntlClientProvider>
          <Provider>
            <Header />
            <Box component="main">
              <Container size="xl" h="100%">
                {children}
              </Container>
            </Box>
            <Footer />
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
