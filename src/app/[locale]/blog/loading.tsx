import { SkeletonText } from "@/components/skeleton-text";
import { Box, Card, Flex, Skeleton, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import React from "react";

export default function Loading() {
  const t = useTranslations();

  return (
    <React.Fragment>
      <Title order={4} ms={20}>
        {t("latest_posts")}
      </Title>
      {Array.from({ length: 3 }).map((_, idx) => (
        <Card key={idx}>
          <Skeleton w={150} h="md" mb={16} />
          <Flex>
            <Box flex={1}>
              <SkeletonText noOfLines={4} />
            </Box>
            <Box
              display={{ base: "none", md: "block" }}
              flex="0 0 180px"
              ms={50}
            >
              <Skeleton w={180} h={118} />
            </Box>
          </Flex>
        </Card>
      ))}
    </React.Fragment>
  );
}
