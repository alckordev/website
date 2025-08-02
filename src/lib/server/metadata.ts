import { Metadata } from "next";

export const getOpenGraph = (
  title: string,
  description: string,
  locale: string
): Metadata["openGraph"] => {
  return {
    type: "website",
    title,
    description,
    locale,
    images: {
      url: `${process.env.SITE_URL}/images/og-image.png`,
      type: "image/png",
      width: 1200,
      height: 630,
    },
  };
};

export const getTwitter = (): Metadata["twitter"] => {
  return {
    card: "summary_large_image",
    site: "@alckordev",
    creator: "@alckordev",
    images: {
      url: `${process.env.SITE_URL}/images/og-image.png`,
      type: "image/png",
      width: 1200,
      height: 630,
    },
  };
};
