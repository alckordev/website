import { Suspense } from "react";
import { getPostSource } from "@/lib";
import { Frontmatter, PageProps, Scope } from "@/type";
import { evaluate, EvaluateOptions } from "next-mdx-remote-client/rsc";
import { components } from "@/components/mdx";
import { Stack, Text, Title } from "@mantine/core";
import { notFound } from "next/navigation";
import readingTime from "reading-time";

export default async function Article(props: PageProps) {
  const { locale, slug } = await props.params;

  const source = await getPostSource(`${locale}/${slug}`);

  if (!source) notFound();

  const options: EvaluateOptions<Scope> = {
    parseFrontmatter: true,
    scope: {
      reading: readingTime(source),
    },
  };

  const { content, frontmatter, scope } = await evaluate<Frontmatter, Scope>({
    source,
    options,
    components,
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Title>{frontmatter.title}</Title>
      <Text>{frontmatter.publishedAt}</Text>
      <pre>{JSON.stringify(scope, null, 2)}</pre>
      <Stack gap="xl">{content}</Stack>
    </Suspense>
  );
}
