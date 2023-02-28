import { Layout } from "../../components";
import { getFilesFrontmatter } from "../../lib/mdx";
import { orderByDate } from "../../lib/order-by-date";

export default function Tags({ allPosts }: any) {
  return (
    <Layout metadata={{ title: "Tags" }}>
      {allPosts.map((post: any) => (
        <div>
          <div>{post.title}</div>
        </div>
      ))}
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await getFilesFrontmatter({ type: "posts" });
  const paths: { params: { tag: string } }[] = [];

  posts.map((post: any) => {
    post.tags.map((tag: any) => {
      paths.push({ params: { tag: tag.slug } });
    });
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const unorderedPosts = await getFilesFrontmatter({ type: "posts" });
  const allPosts = unorderedPosts.sort(orderByDate);

  const filteredPosts = allPosts.filter((post: any) =>
    post.tags.some((tag: any) => tag.slug === params.tag)
  );

  return {
    props: {
      allPosts: filteredPosts,
    },
  };
}
