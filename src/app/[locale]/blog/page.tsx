import React from "react";
import { Divider, Stack, Title } from "@mantine/core";
import { PageProps, PostInfo } from "@/type";
import { BlogPostList } from "@/components/blog-post-list";
import { getPostsInfo } from "@/lib";

export default async function Blog(props: PageProps) {
  const { locale } = await props.params;

  const data: PostInfo[] = await getPostsInfo(locale);

  return (
    <React.Fragment>
      <Title order={4} mb="lg">
        Latest posts
      </Title>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Stack gap="xl">
        <Divider color="var(--mantine-accent-surface)" />
        {data && <BlogPostList data={data} />}
      </Stack>
    </React.Fragment>
  );
}
