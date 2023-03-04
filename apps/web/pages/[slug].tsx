import { MDXRemote } from "next-mdx-remote";
import { Layout, MDXComponent, PostMetadata } from "../components";
import { _date } from "../lib/format-date";
import { getFileBySlug, getFiles } from "../lib/mdx";

export default function Post({ source, frontmatter }: any) {
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
  const { source, frontmatter } = await getFileBySlug({
    type: "posts",
    slug: params.slug,
  });

  return {
    props: {
      source,
      frontmatter: {
        ...frontmatter,
        slug: params.slug,
      },
    },
  };
}
