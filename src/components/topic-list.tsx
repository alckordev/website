"use client";

import { Link } from "@/i18n/navigation";
import { Button, Card, Flex, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import slugify from "slugify";
import topics from "@/assets/data/topics.json";

export const TopicList = () => {
  const t = useTranslations();

  return (
    <Card bg="transparent" p={0}>
      <Title order={4} mb="lg">
        {t("recommended_topics")}
      </Title>
      <Flex gap="xs" wrap="wrap">
        {topics.map((topic) => (
          <Button
            key={topic}
            component={Link}
            href={`/topics/${slugify(topic, {
              lower: true,
              strict: false,
              trim: true,
            })}`}
            variant="light"
            radius="xl"
          >
            {topic}
          </Button>
        ))}
      </Flex>
    </Card>
  );
};
