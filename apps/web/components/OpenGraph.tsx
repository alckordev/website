import Head from "next/head";
import { formatISO } from "date-fns";

interface Props {
  metadata: {
    title?: string;
    summary?: string;
    createdAt?: string;
    slug?: string;
    tags?: {
      name: string;
      slug: string;
    };
  };
}

export const OpenGraph = ({ metadata }: Props) => {
  const SEO = {
    title: metadata.title
      ? `${metadata.title} — Francisco Luis`
      : `Francisco Luis — Senior Developer`,
    description: metadata.summary || "Senior Developer",
    slug: metadata.slug || "",
    image: metadata.title
      ? `https://alckor.dev/api/og?title=${metadata.title}`
      : `https://alckor.dev/api/og`,
    keywords: "Programación, Fullstack, ASP.NET, React, PHP, Firebase",
    author: "Francisco Luis",
    date: metadata.createdAt
      ? formatISO(new Date(metadata.createdAt))
      : formatISO(new Date()),
    copyright: `© ${new Date().getFullYear()} Francisco Luis`,
  };

  return (
    <Head>
      <meta content="IE=edge" http-equiv="X-UA-Compatible" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="canonical" href={`https://alckor.dev/${SEO.slug}`} />
      <meta name="robots" content="follow, index" />
      <meta name="description" content={SEO.description} />
      <meta name="keywords" content={SEO.keywords} />
      <meta name="author" content={SEO.author} />
      <meta name="copyright" content={SEO.copyright} />
      <meta property="og:url" content={`https://alckor.dev/${SEO.slug}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Francisco Luis" />
      <meta property="og:description" content={SEO.description} />
      <meta property="og:title" content={SEO.title} />
      <meta property="og:image" content={SEO.image} />
      <meta property="article:published_time" content={SEO.date} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@alckordev" />
      <meta name="twitter:title" content={SEO.title} />
      <meta name="twitter:description" content={SEO.description} />
      <meta name="twitter:image" content={SEO.image} />
      <title>{SEO.title}</title>
    </Head>
  );
};
