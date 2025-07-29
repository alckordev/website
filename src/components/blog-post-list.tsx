"use client";

import React from "react";
import { BlogPostPreview } from "./blog-post-preview";
import { Center, Loader } from "@mantine/core";
import { PostInfo } from "@/type";
import usePaging from "@/hooks/use-paging";
import useObserver from "@/hooks/use-observer";

export const BlogPostList = ({
  data,
  locale,
}: {
  data: PostInfo[];
  locale: string;
}) => {
  const { getData, goToNext, page, maxPages } = usePaging(data, 5);

  const observer = useObserver(goToNext, { threshold: 1 });

  if (getData().length === 0) return <div>No results</div>;

  return (
    <React.Fragment>
      {getData().map((item) => (
        <BlogPostPreview key={item.slug} item={item} locale={locale} />
      ))}
      {page !== maxPages && (
        <Center ref={observer}>
          <Loader size={50} />
        </Center>
      )}
    </React.Fragment>
  );
};
