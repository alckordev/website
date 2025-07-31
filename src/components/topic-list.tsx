"use client";

import { Link } from "@/i18n/navigation";
import { Badge, Box, Flex, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import slugify from "slugify";
import topics from "@/assets/data/topics.json";

export const TopicList = () => {
  const t = useTranslations();

  return (
    <Box>
      <Title order={4} mb="lg">
        {t("recommended_topics")}
      </Title>
      <Flex gap="xs" wrap="wrap">
        {topics.map((topic) => (
          <Badge
            key={topic}
            component={Link}
            href={`/topics/${slugify(topic, {
              lower: true,
              strict: false,
              trim: true,
            })}`}
            variant="light"
            size="lg"
          >
            {topic}
          </Badge>
        ))}
      </Flex>
    </Box>
  );
};
