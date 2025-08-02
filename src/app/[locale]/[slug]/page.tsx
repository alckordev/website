import React, { cache } from "react";
import {
  getOpenGraph,
  getPostInfo,
  getPostsInfo,
  getPostSource,
  getTwitter,
} from "@/lib/server";
import { Frontmatter, Params, Scope } from "@/type";
import { evaluate, EvaluateOptions } from "next-mdx-remote-client/rsc";
import { components } from "@/components/mdx";
import { Divider, Stack } from "@mantine/core";
import { notFound } from "next/navigation";
import readingTime from "reading-time";
import { BlogPostHeader } from "@/components/blog-post-header";
import remarkFlexibleToc from "remark-flexible-toc";
import { BuyMeACoffee } from "@/components/buy-me-a-coffee";
import { BlogPostFooter } from "@/components/blog-post-footer";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const getPostSourceCached = cache(getPostSource);
const getPostInfoCached = cache(getPostInfo);

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });

  const source = getPostInfoCached(`posts/${locale}/${slug}`);

  const title = `${source?.title} - Isco • ${t("software_developer")}`;
  const description = source?.summary || "";
  const publishedAt = source?.publishedAt
    ? new Date(source.publishedAt)
    : new Date();

  return {
    title,
    description,
    category: t("software_developer"),
    openGraph: {
      ...getOpenGraph(title, description, locale),
      url: `${process.env.SITE_URL}/${locale}/${slug}`,
      type: "article",
      authors: "@alckordev",
      publishedTime: publishedAt.toISOString(),
      tags: source?.topics,
    },
    twitter: getTwitter(),
  };
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    const posts = await getPostsInfo(`posts/${locale}`);

    for (const post of posts) {
      params.push({
        locale,
        slug: post.slug,
      });
    }
  }

  return params;
}

export default async function Page({ params }: { params: Params }) {
  const { locale, slug } = await params;

  const source = await getPostSourceCached(`posts/${locale}/${slug}`);

  if (!source) notFound();

  const options: EvaluateOptions<Scope> = {
    parseFrontmatter: true,
    scope: {
      reading: readingTime(source).minutes,
    },
    mdxOptions: {
      remarkPlugins: [remarkFlexibleToc],
    },
    vfileDataIntoScope: "toc",
  };

  const { content, frontmatter, scope } = await evaluate<Frontmatter, Scope>({
    source,
    options,
    components,
  });

  const url = `${process.env.SITE_URL}/${locale}/${slug}`;

  return (
    <Stack gap="lg">
      <BlogPostHeader scope={{ ...frontmatter, ...scope }} locale={locale} />
      <Stack id="mdx" gap="lg" mb={48} maw="calc(100vw - 48px)" w="100%">
        {content}
      </Stack>
      <BlogPostFooter url={url} />
      <Divider my="xl" />
      <BuyMeACoffee />
    </Stack>
  );
}
