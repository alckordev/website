import { useRef, useEffect } from "react";
import { UI, useColorModeValue } from "@myth/ui";
import { Layout, PostListItem } from "../components";
import { usePagination } from "../hooks/use-pagination";
import { getFilesFrontmatter } from "../lib/mdx";
import { _dateAgo } from "../lib/format-date";
import { orderByDate } from "../lib/order-by-date";

export default function Home({ allPosts }: any) {
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
    <Layout>
      <UI.VStack
        divider={
          <UI.StackDivider
            borderColor={useColorModeValue("gray.200", "gray.900")}
          />
        }
        spacing={12}
        maxW={["100%", "100%", "100%", 790]}
      >
        {currentPosts &&
          currentPosts.map((post: any) => (
            <PostListItem
              key={post.slug}
              title={post.title}
              summary={post.summary}
              customDate={_dateAgo(post.createdAt)}
              dateTime={post.createdAt}
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

export async function getStaticProps() {
  const unorderedPosts = await getFilesFrontmatter({ type: "posts" });
  const allPosts = unorderedPosts.sort(orderByDate);

  return {
    props: { allPosts },
  };
}
