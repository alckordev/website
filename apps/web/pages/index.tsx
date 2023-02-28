import { useRef, useEffect } from "react";
import { UI } from "@myth/ui";
import { AsideLeft, AsideRight, Layout, PostListItem } from "../components";
import { usePagination } from "../hooks/use-pagination";
import { getFilesFrontmatter } from "../lib/mdx";
import { _dateAgo } from "../lib/format-date";
import { orderByDate } from "../lib/order-by-date";

export default function Home({ allPosts }: any) {
  const { next, page, currentData, maxPage } = usePagination(allPosts, 10);
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
    <Layout metadata={{ title: "My Web" }}>
      <UI.Flex
        direction={["column", "column", "row", "row"]}
        flexWrap="wrap"
        mx="-4"
      >
        <UI.Box flexBasis={["100%", "100%", "20%", "20%"]} px={4}>
          <AsideLeft />
        </UI.Box>
        <UI.Box flexBasis={["100%", "100%", "60%", "60%"]} px={4}>
          <UI.VStack spacing={4} my={[16, 16, 0, 0]}>
            {currentPosts &&
              currentPosts.map((post: any) => (
                <PostListItem
                  key={post.slug}
                  title={post.title}
                  summary={post.summary}
                  customDate={_dateAgo(post.date)}
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
        </UI.Box>
        <UI.Box flexBasis={["100%", "100%", "20%", "20%"]} px={4}>
          <AsideRight />
        </UI.Box>
      </UI.Flex>
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
