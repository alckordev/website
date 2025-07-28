import React from "react";
import { getPostSource } from "@/lib/server";
import { Frontmatter, Params, Scope } from "@/type";
import { evaluate, EvaluateOptions } from "next-mdx-remote-client/rsc";
import { components } from "@/components/mdx";
import { Box, Divider, Flex, Stack } from "@mantine/core";
import { notFound } from "next/navigation";
import readingTime from "reading-time";
import { BlogPostHeader } from "@/components/blog-post-header";
import remarkFlexibleToc from "remark-flexible-toc";
import { TocAside } from "@/components/layouts";

// function sleep(ms: number) {
//   return new Promise((r) => setTimeout(r, ms));
// }

export async function generateMetadata() {
  return {
    title: "Lorem ipsum... — Alckor DEV — Software developer",
    description: "I have followed setup instructions carefully",
  };
}

export default async function Article({ params }: { params: Params }) {
  // if (process.env.NODE_ENV === "development") await sleep(10000); // 10 seg

  const { locale, slug } = await params;

  const source = await getPostSource(`${locale}/${slug}`);

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
        <BlogPostHeader scope={{ ...frontmatter, ...scope }} locale={locale} />
        <Stack id="mdx" gap="xl" maw="calc(100vw - 48px)" w="100%">
          {content}
        </Stack>
        <Divider my="xl" />
      </Box>
      <TocAside toc={scope.toc} />
    </Flex>
  );
}
