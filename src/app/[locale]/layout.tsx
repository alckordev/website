import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/notifications/styles.css";
import "@/assets/css/global.css";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Provider } from "@/components/provider";
import { HighlightProvider } from "@/components/highlight-provider";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { LayoutWithParamsProps } from "@/type";
import { Content, Footer, Header } from "@/components/layouts";

// export const metadata: Metadata = {
//   title: "Isco — Software developer",
//   description: "I have followed setup instructions carefully",
// };

export default async function Layout({
  children,
  params,
}: LayoutWithParamsProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={locale} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/images/iso.svg"
          sizes="any"
        />
        {/* <meta
          property="og:image"
          content={`${process.env.SITE_URL}/images/og-image.png`}
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          name="twitter:image"
          content={`${process.env.SITE_URL}/images/og-image.png`}
        />
        <meta name="twitter:image:type" content="image/png" />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" /> */}
      </head>
      <body>
        <NextIntlClientProvider>
          <Provider>
            <Notifications position="top-center" limit={3} />
            <HighlightProvider>
              <Header />
              <Content>{children}</Content>
              <Footer />
            </HighlightProvider>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
