import { Fragment, useEffect, useRef } from "react";
import { UI, useColorModeValue } from "@myth/ui";
import { Layout, PostListItem } from "../../components";
import { usePagination } from "../../hooks/use-pagination";
import { getFilesFrontmatter } from "../../lib/mdx";
import { _dateAgo } from "../../lib/format-date";
import { orderByDate } from "../../lib/order-by-date";

export default function Tags({ allPosts, tag }: any) {
  const { next, page, currentData, maxPage } = usePagination(allPosts, 6);
  const observerRef = useRef<HTMLDivElement>(null);
  const prevY = useRef(0);
  const currentPosts = currentData();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const y = firstEntry.boundingClientRect.y;

        if (prevY.current > y) next();

        prevY.current = y;
      },
      { threshold: 1 }
    );

    const currentRef = observerRef.current;

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [next]);

  return (
    <Layout
      metadata={{ title: `Tema: ${tag}` }}
      heading={
        <Fragment>
          Tema: <UI.Text as="span" fontWeight="normal">{`#${tag}`}</UI.Text>
        </Fragment>
      }
    >
      <UI.VStack
        divider={
          <UI.StackDivider
            borderColor={useColorModeValue("gray.200", "gray.900")}
          />
        }
        spacing={7}
        maxW={["100%", "100%", "100%", 790]}
      >
        {currentPosts &&
          currentPosts.map((post: any) => (
            <PostListItem
              key={post.slug}
              title={post.title}
              summary={post.summary}
              customDate={_dateAgo(post.createdAt)}
              dateTime={post.date}
              slug={post.slug}
              tags={post.tags}
            />
          ))}
        {page !== maxPage && (
          <UI.Flex ref={observerRef} gap={4} align="center">
            <UI.Spinner size="sm" /> Cargando...
          </UI.Flex>
        )}
      </UI.VStack>
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
      tag: params.tag,
    },
  };
}
