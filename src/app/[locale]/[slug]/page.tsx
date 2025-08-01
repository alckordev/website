import React, { cache } from "react";
import { getPostsInfo, getPostSource } from "@/lib/server";
import { Frontmatter, Params, Scope } from "@/type";
import { evaluate, EvaluateOptions } from "next-mdx-remote-client/rsc";
import { components } from "@/components/mdx";
import { Divider, Stack } from "@mantine/core";
import { notFound } from "next/navigation";
import readingTime from "reading-time";
import { BlogPostHeader } from "@/components/blog-post-header";
import remarkFlexibleToc from "remark-flexible-toc";
import { BuyMeACoffee } from "@/components/buy-me-a-coffee";
import { BlogPostFooter } from "@/components/blog-post-footer";
import { routing } from "@/i18n/routing";
import { getThread } from "@/lib/client/threads";

const getPostSourceCached = cache(getPostSource);

export async function generateMetadata() {
  return {
    title: "Lorem ipsum... — Alckor DEV — Software developer",
    description: "I have followed setup instructions carefully",
  };
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    const posts = await getPostsInfo(`posts/${locale}`);

    for (const post of posts) {
      params.push({
        locale,
        slug: post.slug,
      });
    }
  }

  return params;
}

export default async function Page({ params }: { params: Params }) {
  const { locale, slug } = await params;

  const source = await getPostSourceCached(`posts/${locale}/${slug}`);

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

  const thread = await getThread({
    identifier: `${locale}/${slug}`,
  });

  return (
    <Stack gap="lg">
      <BlogPostHeader scope={{ ...frontmatter, ...scope }} locale={locale} />
      <Stack id="mdx" gap="lg" mb={48} maw="calc(100vw - 48px)" w="100%">
        {content}
      </Stack>
      <BlogPostFooter thread={thread.uid!} locale={locale} />
      <Divider my="xl" />
      <BuyMeACoffee />
    </Stack>
  );
}
