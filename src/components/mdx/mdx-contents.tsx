"use client";

import { Toc } from "@/type";
import { Box, TableOfContents, Title } from "@mantine/core";
import { useTranslations } from "next-intl";

export const MDXContents = ({ toc }: { toc?: Toc }) => {
  const t = useTranslations();

  if (!toc) return null;

  return (
    <Box>
      <Title order={4} mb="lg">
        {t("table_of_contents")}
      </Title>
      <TableOfContents
        variant="none"
        radius="sm"
        scrollSpyOptions={{
          selector: "#mdx :is(h1, h2, h3, h4, h5, h6)",
        }}
        __vars={{
          "--toc-color": "var(--mantine-color-anchor)",
        }}
        getControlProps={({ data }) => ({
          onClick: () => {
            data
              .getNode()
              .scrollIntoView({ behavior: "smooth", block: "start" });
          },
          children: data.value,
          px: 0,
        })}
      />
    </Box>
  );
};
