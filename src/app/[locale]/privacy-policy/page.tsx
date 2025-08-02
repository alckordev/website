import { BlogPostHeader } from "@/components/blog-post-header";
import { components } from "@/components/mdx";
import { getOpenGraph, getPostSource, getTwitter } from "@/lib/server";
import { Frontmatter, Params, Scope } from "@/type";
import { Box, Divider, Flex, Stack } from "@mantine/core";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { evaluate, EvaluateOptions } from "next-mdx-remote-client/rsc";
import { notFound } from "next/navigation";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = `${t("privacy_policy")} - Isco • ${t("software_developer")}`;
  const description = t("privacy_policy_description");

  return {
    title,
    description,
    category: t("software_developer"),
    openGraph: {
      ...getOpenGraph(title, description, locale),
      url: `${process.env.SITE_URL}/${locale}/privacy-policy`,
    },
    twitter: getTwitter(),
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
