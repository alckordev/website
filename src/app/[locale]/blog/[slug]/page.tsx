import { Suspense } from "react";
import { getPostSource } from "@/lib/server";
import { Frontmatter, Params, Scope } from "@/type";
import { evaluate, EvaluateOptions } from "next-mdx-remote-client/rsc";
import { components } from "@/components/mdx";
import { Divider, Stack } from "@mantine/core";
import { notFound } from "next/navigation";
import readingTime from "reading-time";
import { BlogPostHeader } from "@/components/blog-post-header";
import remarkFlexibleToc from "remark-flexible-toc";

export default async function Article({ params }: { params: Params }) {
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
    <Suspense fallback={<div>Loading...</div>}>
      {/* <pre>{JSON.stringify(scope.toc, null, 2)}</pre> */}
      <BlogPostHeader scope={{ ...frontmatter, ...scope }} locale={locale} />
      <Stack gap="xl" maw="calc(100vw - 48px)" w="100%">
        {content}
      </Stack>
      <Divider my="xl" />
    </Suspense>
  );
}
