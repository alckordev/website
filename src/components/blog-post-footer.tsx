"use client";

import { fb, linkedin, tw } from "@/lib/client";
import { ActionIcon, alpha, Flex, Group, Text, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import {
  RiCheckLine,
  RiFacebookLine,
  RiLinkedinLine,
  RiLinksLine,
  RiTwitterXLine,
} from "@remixicon/react";
import { useTranslations } from "next-intl";
import React from "react";

export const BlogPostFooter = ({ url }: { url: string }) => {
  const t = useTranslations();
  const clipboard = useClipboard({ timeout: 1000 });

  return (
    <React.Suspense fallback={<div>test...</div>}>
      <Flex pos="sticky" bottom={32} my={48} align="center" justify="center">
        <Group
          bg={alpha("var(--mantine-color-dark-9)", 0.8)}
          bdrs="lg"
          px={28}
          py={12}
          style={(theme) => ({
            boxShadow: theme.shadows.lg,
            backdropFilter: "saturate(100%) blur(10px)",
          })}
        >
          <Text>{t("share_on")}</Text>
          <Group>
            <Tooltip label="Twitter X">
              <ActionIcon variant="light" onClick={() => tw({ url })}>
                <RiTwitterXLine size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Facebook">
              <ActionIcon variant="light" onClick={() => fb({ url })}>
                <RiFacebookLine size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Linked in">
              <ActionIcon variant="light" onClick={() => linkedin({ url })}>
                <RiLinkedinLine size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={t("copy_link")}>
              <ActionIcon variant="light" onClick={() => clipboard.copy(url)}>
                {clipboard.copied ? (
                  <RiCheckLine size={16} />
                ) : (
                  <RiLinksLine size={16} />
                )}
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </Flex>
    </React.Suspense>
  );
};
