"use client";

import { Card, Divider, Stack, TableOfContents, Title } from "@mantine/core";
import { TopicList } from "../topic-list";
import { Newsletter } from "../newsletter";
import { Toc } from "@/type";
import React from "react";
import { useTranslations } from "next-intl";

export const TocAside = ({ toc }: { toc?: Toc }) => {
  const t = useTranslations();

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
        {toc && (
          <React.Fragment>
            <Card bg="transparent" p={0}>
              <Title order={4} mb="lg">
                {t("table_of_contents")}
              </Title>
              <TableOfContents
                variant="light"
                color="accent"
                radius="sm"
                scrollSpyOptions={{
                  selector: "#mdx :is(h1, h2, h3, h4, h5, h6)",
                }}
                getControlProps={({ data }) => ({
                  onClick: () => {
                    data
                      .getNode()
                      .scrollIntoView({ behavior: "smooth", block: "start" });
                  },
                  children: data.value,
                })}
              />
            </Card>
            <Divider />
          </React.Fragment>
        )}
        <TopicList />
        <Divider />
        <Newsletter />
      </Stack>
    </Stack>
  );
};
