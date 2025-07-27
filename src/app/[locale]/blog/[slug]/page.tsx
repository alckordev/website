import { Suspense } from "react";
import { getPostSource } from "@/lib/server";
import { Frontmatter, PageProps, Scope } from "@/type";
import { evaluate, EvaluateOptions } from "next-mdx-remote-client/rsc";
import { components } from "@/components/mdx";
import { Divider, Stack } from "@mantine/core";
import { notFound } from "next/navigation";
import readingTime from "reading-time";
import { BlogPostHeader } from "@/components/blog-post-header";

export default async function Article(props: PageProps) {
  const { locale, slug } = await props.params;

  const source = await getPostSource(`${locale}/${slug}`);

  if (!source) notFound();

  const options: EvaluateOptions<Scope> = {
    parseFrontmatter: true,
    scope: {
      reading: readingTime(source).minutes,
      test: "testing",
    },
  };

  const { content, frontmatter, scope } = await evaluate<Frontmatter, Scope>({
    source,
    options,
    components,
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogPostHeader scope={{ ...frontmatter, ...scope }} locale={locale} />
      <Stack gap="xl" maw="calc(100vw - 48px)" w="100%">
        {content}
      </Stack>
      <Divider my="xl" />
    </Suspense>
  );
}
