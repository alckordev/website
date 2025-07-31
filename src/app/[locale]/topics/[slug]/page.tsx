import { BlogPostList } from "@/components/blog-post-list";
import { Aside } from "@/components/layouts";
import { routing } from "@/i18n/routing";
import { getPostsInfo } from "@/lib/server";
import { Params } from "@/type";
import { Box, Flex, Stack, Title } from "@mantine/core";
import React from "react";
import { cache } from "react";
import slugify from "slugify";

const getPostsInfoCached = cache(getPostsInfo);

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    const posts = await getPostsInfo(`posts/${locale}`);
    const topics = new Set(posts.flatMap((p) => p.topics ?? []));

    for (const topic of topics) {
      params.push({
        locale,
        slug: slugify(topic, { lower: true, strict: true }),
      });
    }
  }

  return params;
}

export default async function Page({ params }: { params: Params }) {
  const { locale, slug } = await params;

  const data = await getPostsInfoCached(`posts/${locale}`);

  const filtered = data.filter((p) =>
    p.topics?.some(
      (t) => slugify(t, { lower: true, strict: true, trim: true }) === slug
    )
  );

  const hasTopic = (topic: string) =>
    slugify(topic, { lower: true, strict: true, trim: true }) === slug;

  // Test searching topic slug in data/topics.json
  const prettyName =
    filtered.flatMap((p) => p.topics || []).find(hasTopic) ??
    slug?.replace("-", " ");

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      justify="space-evenly"
      mx="-md"
      mih="100%"
    >
      <Box
        flex="1 1 auto"
        maw={{ sm: 728, md: 790 }}
        mx="auto"
        py={50}
        ps="md"
        pe={{ base: "md", lg: "xl" }}
      >
        <Title order={4} pb="xs" mb="md" ms={20}>
          {prettyName}
        </Title>
        <Stack gap="xl">
          <React.Suspense fallback={<div>Loading topic posts</div>}>
            <BlogPostList data={filtered} locale={locale} />
          </React.Suspense>
        </Stack>
      </Box>
      <Aside />
    </Flex>
  );
}
