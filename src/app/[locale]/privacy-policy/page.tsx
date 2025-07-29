import { BlogPostHeader } from "@/components/blog-post-header";
import { components } from "@/components/mdx";
import { getPostSource } from "@/lib/server";
import { Frontmatter, Params, Scope } from "@/type";
import { Box, Divider, Flex, Stack } from "@mantine/core";
import { evaluate, EvaluateOptions } from "next-mdx-remote-client/rsc";
import { notFound } from "next/navigation";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";

export async function generateMetadata() {
  return {
    title: "Policy... — Alckor DEV — Software developer",
    description: "I have followed setup instructions carefully",
  };
}

export default async function Page({ params }: { params: Params }) {
  const { locale } = await params;

  const source = await getPostSource(`page/${locale}/privacy-policy`);

  if (!source) notFound();

  const options: EvaluateOptions<Scope> = {
    parseFrontmatter: true,
    scope: {
      reading: readingTime(source).minutes,
    },
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  };

  const { content, frontmatter, scope } = await evaluate<Frontmatter, Scope>({
    source,
    options,
    components,
  });

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      justify="space-evenly"
      mx="-md"
      mih="100%"
    >
      <Box
        component="article"
        flex="1 1 auto"
        maw={{ sm: 728, md: 790 }}
        mx="auto"
        py={50}
        ps="md"
        pe={{ base: "md", lg: "xl" }}
      >
        <BlogPostHeader scope={{ ...frontmatter, ...scope }} locale={locale} />
        <Divider mb="xl" />
        <Stack gap="xl" mb={48} maw="calc(100vw - 48px)" w="100%">
          {content}
        </Stack>
      </Box>
    </Flex>
  );
}
