"use client";

import React from "react";
import { BlogPostPreview } from "./blog-post-preview";
import { Center, Divider, Loader } from "@mantine/core";
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

  return (
    <React.Fragment>
      {getData().map((item, idx) => (
        <React.Fragment key={item.slug}>
          <BlogPostPreview item={item} locale={locale} />
          {idx + 1 !== getData().length && (
            <Divider color="var(--mantine-accent-surface)" />
          )}
        </React.Fragment>
      ))}
      {page !== maxPages && (
        <Center ref={observer}>
          <Loader size={50} />
        </Center>
      )}
    </React.Fragment>
  );
};
