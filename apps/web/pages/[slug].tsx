import { MDXRemote } from "next-mdx-remote";
import { Layout, MDXComponent, PostMetadata } from "../components";
import { _date } from "../lib/format-date";
import { getFileBySlug, getFiles, getFilesFrontmatter } from "../lib/mdx";
import { orderByDate } from "../lib/order-by-date";
import { getThread } from "../lib/firebase-utils";

export default function Post({ source, thread, frontmatter }: any) {
  return (
    <Layout metadata={frontmatter} thread={thread}>
      <PostMetadata
        title={frontmatter.title}
        slug={frontmatter.slug}
        customDate={_date(frontmatter.createdAt)}
        dateTime={frontmatter.createdAt}
        readingTime={frontmatter.readingTime.minutes}
        tags={frontmatter.tags}
      />
      <MDXRemote {...source} components={MDXComponent} />
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
        relateds,
      },
    },
  };
}
