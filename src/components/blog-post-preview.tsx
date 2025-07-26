"use client";

import {
  Anchor,
  AspectRatio,
  Box,
  Button,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { RiChat1Fill, RiHeartFill } from "@remixicon/react";
import NextImage from "next/image";
import { Link } from "@/i18n/navigation";
import { PostMatter } from "@/type";

export const BlogPostPreview = ({ item }: { item: PostMatter }) => {
  return (
    <Stack gap="xs">
      <Text component="time" dateTime="2025-07-25" size="sm">
        25 july, 2025
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
          <Box my={4}>
            <Text c="var(--mantine-color-text)" lineClamp={2}>
              {item.summary}
            </Text>
          </Box>
        </Anchor>
        <Box display={{ base: "none", md: "block" }} flex="0 0 180px" ms="50px">
          <AspectRatio ratio={180 / 118} maw={180} mx="auto">
            <Image
              component={NextImage}
              src="https://placehold.co/180x118"
              alt=""
              width={180}
              height={118}
              radius="md"
            />
          </AspectRatio>
        </Box>
      </Flex>
      <Group gap="xs">
        <Button
          leftSection={
            <RiHeartFill color="var(--mantine-color-red-7)" size={20} />
          }
          variant="transparent"
          size="compact-sm"
          c="var(--mantine-color-text)"
        >
          193
        </Button>
        <Button
          leftSection={<RiChat1Fill size={20} />}
          variant="transparent"
          size="compact-sm"
          c="var(--mantine-color-text)"
        >
          10
        </Button>
      </Group>
    </Stack>
  );
};
