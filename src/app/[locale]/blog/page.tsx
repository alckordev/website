import { Params } from "@/type";
import { BlogPostList } from "@/components/blog-post-list";
import { getPostsInfo } from "@/lib/server";
import React, { cache } from "react";
import { Title } from "@mantine/core";
import { getTranslations } from "next-intl/server";
// import { sleep } from "@/utils/sleep";

const getPostsInfoCached = cache(getPostsInfo);

export async function generateMetadata() {
  return {
    title: "Blog — Alckor DEV — Software developer",
    description: "I have followed setup instructions carefully",
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
      <BlogPostList data={data} locale={locale} />;
    </React.Fragment>
  );
}
