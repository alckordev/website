import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/spotlight/styles.css";
import "@/assets/css/global.css";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { Provider } from "@/components/provider";
import { HighlightProvider } from "@/components/highlight-provider";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { LayoutWithParamsProps } from "@/type";
import { Content, Footer, Header } from "@/components/layouts";

export const metadata: Metadata = {
  title: "ADev — Software developer",
  description: "I have followed setup instructions carefully",
};

export default async function Layout({
  children,
  auth,
  params,
}: LayoutWithParamsProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  console.log("@auth", auth);

  return (
    <html lang={locale} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <NextIntlClientProvider>
          <Provider>
            <HighlightProvider>
              <Header />
              <Content>
                {auth}
                {children}
              </Content>
              <Footer />
            </HighlightProvider>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
