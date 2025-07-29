import { Box, Flex, Stack, Title } from "@mantine/core";
import { Params, PostInfo } from "@/type";
import { BlogPostList } from "@/components/blog-post-list";
import { getPostsInfo } from "@/lib/server";
import { Aside } from "@/components/layouts";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  return {
    title: "Blog — Alckor DEV — Software developer",
    description: "I have followed setup instructions carefully",
  };
}

export default async function Page({ params }: { params: Params }) {
  const { locale } = await params;

  const data: PostInfo[] = await getPostsInfo(`posts/${locale}`);

  const t = await getTranslations();

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
        <Title
          order={4}
          pb="xs"
          mb="xl"
          style={{
            boxShadow: "inset 0 -1px 0 0 var(--mantine-accent-surface)",
          }}
        >
          {t("latest_posts")}
        </Title>
        <Stack gap="xl">
          {data && <BlogPostList data={data} locale={locale} />}
        </Stack>
      </Box>
      <Aside />
    </Flex>
  );
}
