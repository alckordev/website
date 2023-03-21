import { Fragment, useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { UI, useColorModeValue } from "@myth/ui";
import {
  Layout,
  MDXComponent,
  PostFooter,
  PostMetadata,
  PostListItem,
} from "../components";
import { _date } from "../lib/format-date";
import { getFileBySlug, getFiles, getFilesFrontmatter } from "../lib/mdx";
import { orderByDate } from "../lib/order-by-date";
import { getThread } from "../lib/firebase-utils";
import { SkeletonPost } from "../components/Skeleton";

export default function Post({ source, thread, frontmatter, relateds }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dividerBorderColor = useColorModeValue("gray.200", "gray.928");
  const bgColor = useColorModeValue("gray.100", "gray.900");

  useEffect(() => setIsLoading(false), [source]);

  return (
    <Layout metadata={frontmatter}>
      {isLoading ? (
        <SkeletonPost />
      ) : (
        <Fragment>
          <PostMetadata
            title={frontmatter.title}
            coverImage={frontmatter.coverImage}
            customDate={_date(frontmatter.createdAt)}
            dateTime={frontmatter.createdAt}
            readingTime={frontmatter.readingTime.minutes}
            tags={frontmatter.tags}
          />
          <MDXRemote {...source} components={MDXComponent} />

          <PostFooter thread={thread} />

          {relateds.length > 0 && (
            <UI.VStack
              divider={<UI.StackDivider borderColor={dividerBorderColor} />}
              bg={bgColor}
              spacing={7}
              p="24px"
            >
              {relateds.map((post: any) => (
                <PostListItem
                  key={post.slug}
                  title={post.title}
                  summary={post.summary}
                  coverImage={post.coverImage}
                  customDate={_date(post.createdAt)}
                  dateTime={post.createdAt}
                  slug={post.slug}
                  tags={post.tags}
                />
              ))}
            </UI.VStack>
          )}
        </Fragment>
      )}
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await getFiles({ type: "posts" });
  const paths = posts.map((post) => ({
    params: {
      slug: post.replace(/\.mdx/, ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const { source, frontmatter }: any = await getFileBySlug({
    type: "posts",
    slug: params.slug,
  });

  let relateds: any[] = [];

  if (frontmatter.relateds && frontmatter.relateds.length) {
    const slugs = frontmatter.relateds;
    const allPosts = await getFilesFrontmatter({ type: "posts" });

    relateds = allPosts.filter((post: any) => slugs.includes(post.slug));
    relateds = relateds.sort(orderByDate);
  }

  const thread = await getThread({
    title: frontmatter.title,
    identifier: params.slug,
    url: `http://localhost:3000/${params.slug}`,
  });

  return {
    props: {
      source,
      thread,
      frontmatter: {
        ...frontmatter,
        slug: params.slug,
      },
      relateds,
    },
  };
}
