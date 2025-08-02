import { Params } from "@/type";
import { BlogPostList } from "@/components/blog-post-list";
import { getOpenGraph, getPostsInfo, getTwitter } from "@/lib/server";
import React, { cache } from "react";
import { Title } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
// import { sleep } from "@/utils/sleep";

const getPostsInfoCached = cache(getPostsInfo);

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = `Blog - Isco • ${t("software_developer")}`;
  const description = t("blog_description");

  return {
    title,
    description,
    category: t("software_developer"),
    openGraph: {
      ...getOpenGraph(title, description, locale),
      url: `${process.env.SITE_URL}/${locale}/blog`,
    },
    twitter: getTwitter(),
  };
}

export default async function Page({ params }: { params: Params }) {
  const { locale } = await params;

  const t = await getTranslations();

  const data = (await getPostsInfoCached(`posts/${locale}`)).toSorted(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // await sleep(15000);

  return (
    <React.Fragment>
      <Title order={4} ms={20}>
        {t("latest_posts")}
      </Title>
      <BlogPostList data={data} locale={locale} />
    </React.Fragment>
  );
}
