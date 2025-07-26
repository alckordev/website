import React from "react";
import { BlogPostPreview } from "@/components/blog-post-preview";
import { Divider, Stack, Title } from "@mantine/core";

const posts = Array.from({ length: 10 });

export default function Blog() {
  return (
    <React.Fragment>
      <Title order={4} mb="lg">
        Latest posts
      </Title>
      <Stack gap="xl">
        <Divider color="var(--mantine-accent-surface)" />
        {posts.map((_, idx) => (
          <React.Fragment key={idx}>
            <BlogPostPreview />
            {idx + 1 !== posts.length && (
              <Divider color="var(--mantine-accent-surface)" />
            )}
          </React.Fragment>
        ))}
      </Stack>
    </React.Fragment>
  );
}
