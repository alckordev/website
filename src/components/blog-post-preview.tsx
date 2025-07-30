"use client";

import {
  Anchor,
  AspectRatio,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { RiChat1Fill, RiHeartFill } from "@remixicon/react";
import NextImage from "next/image";
import { Link } from "@/i18n/navigation";
import { PostInfo } from "@/type";
import { formatRelativeDate } from "@/lib/client";

export const BlogPostPreview = ({
  item,
  locale,
}: {
  item: PostInfo;
  locale: string;
}) => {
  return (
    <Card p={20}>
      <Text component="time" dateTime={item.publishedAt} size="sm" mb={16}>
        {formatRelativeDate(item.publishedAt, locale)}
      </Text>
      <Flex>
        <Anchor
          component={Link}
          href={`/blog/${item.slug}`}
          underline="never"
          flex={1}
        >
          <Title order={3} textWrap="balance" lineClamp={2}>
            {item.title}
          </Title>
          <Box m="4 0 16">
            <Text c="gray.3" lineClamp={2}>
              {item.summary}
            </Text>
          </Box>
          <Group gap="xs">
            <Button
              leftSection={
                <RiHeartFill color="var(--mantine-color-red-7)" size={20} />
              }
              variant="transparent"
              size="compact-sm"
              c="gray.3"
            >
              193
            </Button>
            <Button
              leftSection={<RiChat1Fill size={20} />}
              variant="transparent"
              size="compact-sm"
              c="gray.3"
            >
              10
            </Button>
          </Group>
        </Anchor>
        <Box display={{ base: "none", md: "block" }} flex="0 0 180px" ms={50}>
          <AspectRatio ratio={180 / 118} maw={180} mx="auto">
            <Image
              component={NextImage}
              src={item.cover || "https://placehold.co/180x118"}
              alt=""
              width={180}
              height={118}
              radius="md"
            />
          </AspectRatio>
        </Box>
      </Flex>
    </Card>
  );
};
