"use client";

import {
  ActionIcon,
  alpha,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  Menu,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  RiChat1Line,
  RiFacebookLine,
  RiLinkedinLine,
  RiLinksLine,
  RiShareLine,
  RiTwitterXLine,
} from "@remixicon/react";
import { useTranslations } from "next-intl";
import React from "react";
import { ThreadLikeToggle } from "./disqus";

export const BlogPostFooter = ({
  thread,
  locale,
}: {
  thread: string;
  locale: string;
}) => {
  const t = useTranslations();

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <React.Suspense fallback={<div>test...</div>}>
      <Flex pos="sticky" bottom={32} my={48} align="center" justify="center">
        <Group
          bg={alpha("var(--mantine-color-dark-9)", 0.8)}
          bdrs="md"
          px={28}
          py={12}
          style={(theme) => ({
            boxShadow: theme.shadows.lg,
            backdropFilter: "saturate(100%) blur(10px)",
          })}
        >
          <ThreadLikeToggle thread={thread} locale={locale} />
          <Divider orientation="vertical" />
          <Button
            variant="transparent"
            c="white"
            size="compact-md"
            px={0}
            leftSection={<RiChat1Line size={20} />}
            onClick={open}
          >
            99
          </Button>
          <Divider orientation="vertical" />
          <Menu>
            <Menu.Target>
              <ActionIcon variant="transparent" c="white" size="compact-md">
                <RiShareLine size={20} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<RiLinksLine size={16} />}>
                {t("copy_link")}
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item leftSection={<RiTwitterXLine size={16} />}>
                {t("share_on", { social: "X" })}
              </Menu.Item>
              <Menu.Item leftSection={<RiFacebookLine size={16} />}>
                {t("share_on", { social: "Facebook" })}
              </Menu.Item>
              <Menu.Item leftSection={<RiLinkedinLine size={16} />}>
                {t("share_on", { social: "LinkedIn" })}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Flex>
      <Drawer
        opened={opened}
        onClose={close}
        title={`${t("responses")}: 99`}
        position="right"
        overlayProps={{ bg: "transparent" }}
        shadow="lg"
      >
        <Stack>
          <div>Editor</div>
          <div>Comments</div>
        </Stack>
      </Drawer>
    </React.Suspense>
  );
};
