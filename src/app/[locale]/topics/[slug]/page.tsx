import { BlogPostList } from "@/components/blog-post-list";
import { routing } from "@/i18n/routing";
import { getOpenGraph, getPostsInfo, getTwitter } from "@/lib/server";
import { Params } from "@/type";
import { Title } from "@mantine/core";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";
import { cache } from "react";
import slugify from "slugify";
import topics from "@/assets/data/topics.json";
import { notFound } from "next/navigation";

const getPostsInfoCached = cache(getPostsInfo);

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });

  const topic = topics.find(
    (t) =>
      slugify(t, {
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: false,
        trim: true,
      }) === slug
  );

  const title = `${topic} - Isco • ${t("software_developer")}`;
  const description = t("articles_about", { topic: topic || "" });

  return {
    title,
    description,
    category: t("software_developer"),
    openGraph: {
      ...getOpenGraph(title, description, locale),
      url: `${process.env.SITE_URL}/${locale}/topics/${slug}`,
    },
    twitter: getTwitter(),
  };
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    const posts = await getPostsInfo(`posts/${locale}`);
    const topics = new Set(posts.flatMap((p) => p.topics ?? []));

    for (const topic of topics) {
      params.push({
        locale,
        slug: slugify(topic, {
          remove: /[*+~.()'"!:@]/g,
          lower: true,
          strict: false,
          trim: true,
        }),
      });
    }
  }

  return params;
}

export default async function Page({ params }: { params: Params }) {
  const { locale, slug } = await params;

  const data = await getPostsInfoCached(`posts/${locale}`);

  const filtered = data
    .filter((p) =>
      p.topics?.some(
        (t) =>
          slugify(t, {
            remove: /[*+~.()'"!:@]/g,
            lower: true,
            strict: false,
            trim: true,
          }) === slug
      )
    )
    .toSorted(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  const topic = topics.find(
    (t) =>
      slugify(t, {
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: false,
        trim: true,
      }) === slug
  );

  if (!topic) notFound();

  return (
    <React.Fragment>
      <Title order={4} pb="xs" mb="md" ms={20}>
        {topic}
      </Title>
      <BlogPostList data={filtered} locale={locale} />
    </React.Fragment>
  );
}
