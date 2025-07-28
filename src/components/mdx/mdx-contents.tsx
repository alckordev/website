"use client";

import { Toc } from "@/type";
import { Card, TableOfContents, Title } from "@mantine/core";
import { useTranslations } from "next-intl";

export const MDXContents = ({ toc }: { toc?: Toc }) => {
  const t = useTranslations();

  if (!toc) return null;

  return (
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
  );
};
