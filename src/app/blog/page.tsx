import React from "react";
import { BlogPostPreview } from "@/components/blog-post-preview";
import { Divider, Stack } from "@mantine/core";

const posts = Array.from({ length: 10 });

export default function Blog() {
  return (
    <Stack gap="xl">
      {posts.map((_, idx) => (
        <React.Fragment key={idx}>
          <BlogPostPreview />
          {idx + 1 !== posts.length && (
            <Divider color="var(--mantine-accent-surface)" />
          )}
        </React.Fragment>
      ))}
    </Stack>
  );
}
