import { useEffect, useState, useRef } from "react";
import { UI, useColorModeValue } from "@myth/ui";
import { Layout, PostListItem } from "../components";
import { usePagination } from "../hooks/use-pagination";
import { getFilesFrontmatter } from "../lib/mdx";
import { _date } from "../lib/format-date";
import { orderByDate } from "../lib/order-by-date";
import { SkeletonPostListItem } from "../components/Skeleton";

export default function Home({ allPosts }: any) {
  const { next, page, currentData, maxPage } = usePagination(allPosts, 6);

  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  useEffect(() => setIsLoading(false), [currentPosts]);

  return (
    <Layout>
      <UI.VStack
        divider={
          <UI.StackDivider
            borderColor={useColorModeValue("gray.200", "gray.958")}
          />
        }
        spacing={7}
        maxW={["100%", "100%", "100%", 790]}
      >
        {isLoading
          ? Array(4)
              .fill(null)
              .map((_, i) => <SkeletonPostListItem key={i} />)
          : currentPosts.map((post: any) => (
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
