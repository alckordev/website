"use client";

import React from "react";
import { Divider, Stack } from "@mantine/core";
import { Newsletter } from "../newsletter";
import { TopicList } from "../topic-list";
import { ProjectList } from "../project-list";

export const Aside = () => {
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
      <Stack gap="xl">
        <ProjectList />
      </Stack>
      <Divider />
      <Stack gap="xl" pos="sticky" top={120}>
        <TopicList />
        <Divider />
        <Newsletter />
      </Stack>
    </Stack>
  );
};
