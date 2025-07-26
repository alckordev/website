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

export const BlogPostPreview = () => {
  return (
    <Box data-href="/blog/lorem-ipsum" style={{ cursor: "pointer" }}>
      <Stack gap="xs">
        <Text component="time" dateTime="2025-07-25" size="sm">
          25 july, 2025
        </Text>
        <Flex>
          <Anchor
            component={Link}
            href="/blog/lorem-ipsum"
            underline="never"
            flex={1}
          >
            <Title order={3} textWrap="balance" lineClamp={2}>
              You’re using ChatGPT wrong. Here’s how to prompt like a pro
            </Title>
            <Box my={4}>
              <Text c="var(--mantine-color-text)" lineClamp={2}>
                20 Science-Based Principles and Strategies for Building
                Fluency — From a Linguist, Language Teacher, and Polyglot
              </Text>
            </Box>
          </Anchor>
          <Box
            display={{ base: "none", md: "block" }}
            flex="0 0 180px"
            ms="50px"
          >
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
    </Box>
  );
};
