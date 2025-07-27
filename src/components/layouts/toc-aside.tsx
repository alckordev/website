"use client";

import { Card, Divider, Stack, TableOfContents, Title } from "@mantine/core";
import { TopicList } from "../topic-list";
import { Newsletter } from "../newsletter";

export const TocAside = () => {
  return (
    <Stack
      component="aside"
      role="navigation"
      display={{ base: "none", lg: "flex" }}
      miw={380}
      maw={380}
      mih="100%"
      mx="auto"
      py={50}
      ps={{ base: "md", lg: "xl" }}
      pe="md"
      gap="xl"
      style={{
        borderLeft: "1px solid var(--mantine-accent-surface)",
      }}
    >
      <Stack gap="xl" pos="sticky" top={120}>
        <Card
          bg="transparent"
          radius="md"
          withBorder
          style={{ borderColor: "var(--mantine-accent-surface)" }}
        >
          <Title order={4} mb="lg">
            Table of contents
          </Title>
          <TableOfContents
            variant="light"
            color="accent"
            radius="sm"
            getControlProps={({ data }) => ({
              onClick: () =>
                data.getNode().scrollIntoView({ behavior: "smooth" }),
              children: data.value,
            })}
            // getControlProps={({ active, data }) => ({
            //   component: "a",
            //   href: `#${data.id}`,
            //   style: { color: active ? "blue" : "gray" },
            //   children: data.value,
            // })}
          />
        </Card>
        <Divider />
        <TopicList />
        <Divider />
        <Newsletter />
      </Stack>
    </Stack>
  );
};
