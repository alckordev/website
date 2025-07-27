import React from "react";
import { Box, Divider, Flex, Stack, Title } from "@mantine/core";
import { PostInfo } from "@/type";
import { BlogPostList } from "@/components/blog-post-list";
import { getPostsInfo } from "@/lib/server";
import { getLocale } from "next-intl/server";
import { Aside, Content, Footer, Header } from "@/components/layouts";

export async function generateMetadata() {
  return {
    title: "Blog — Alckor DEV — Software developer",
    description: "I have followed setup instructions carefully",
  };
}

export default async function Blog() {
  const locale = await getLocale();

  const data: PostInfo[] = await getPostsInfo(locale);

  return (
    <React.Fragment>
      <Header />
      <Content>
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
            <Title order={4} mb="lg">
              Latest posts
            </Title>
            <Stack gap="xl">
              <Divider color="var(--mantine-accent-surface)" />
              {data && <BlogPostList data={data} locale={locale} />}
            </Stack>
          </Box>
          <Aside />
        </Flex>
      </Content>
      <Footer />
    </React.Fragment>
  );
}
