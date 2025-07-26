import React from "react";
import { Divider, Stack, Title } from "@mantine/core";
import { PageProps, PostMatter } from "@/type";
import { getFrontMatter } from "@/lib";
import { BlogPostList } from "@/components/blog-post-list";

export default async function Blog(props: PageProps) {
  const { locale } = await props.params;

  const data: PostMatter[] = await getFrontMatter(locale);

  return (
    <React.Fragment>
      <Title order={4} mb="lg">
        Latest posts
      </Title>
      <Stack gap="xl">
        <Divider color="var(--mantine-accent-surface)" />
        <BlogPostList data={data} />
      </Stack>
    </React.Fragment>
  );
}
