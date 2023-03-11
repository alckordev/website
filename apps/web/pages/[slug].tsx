import { MDXRemote } from "next-mdx-remote";
import { Layout, MDXComponent, PostMetadata } from "../components";
import { _date } from "../lib/format-date";
import { getFileBySlug, getFiles } from "../lib/mdx";
import { getThread } from "../lib/firebase-utils";

export default function Post({ source, thread, frontmatter }: any) {
  console.log("thread", thread);

  return (
    <Layout metadata={frontmatter}>
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
    },
  };
}
