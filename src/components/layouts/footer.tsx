"use client";

import { Link } from "@/i18n/navigation";
import {
  Anchor,
  Box,
  Container,
  Divider,
  Flex,
  Group,
  Text,
  ThemeIcon,
} from "@mantine/core";
import {
  RiGithubFill,
  RiLinkedinFill,
  RiTiktokFill,
  RiTwitterXFill,
} from "@remixicon/react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "../language-switcher";

export const Footer = () => {
  const t = useTranslations();

  return (
    <Box
      component="footer"
      role="footer"
      bg="var(--mantine-accent-backdrop)"
      style={{
        boxShadow: "inset 0 1px 0 0 var(--mantine-accent-surface)",
      }}
    >
      <Container size="xl">
        <Flex
          mih="70px"
          justify="space-between"
          align="center"
          direction={{ base: "column", md: "row" }}
          gap="md"
          py="lg"
        >
          <Group>
            <Text>© 2025 - alckor.dev</Text>
            <LanguageSwitcher />
          </Group>
          <Group gap="xs">
            <Anchor
              aria-label="Github"
              href="https://github.com/alckordev"
              rel="noopener"
              display="inline-flex"
              target="_blank"
            >
              <ThemeIcon variant="transparent" color="white">
                <RiGithubFill size={18} />
              </ThemeIcon>
            </Anchor>
            <Divider orientation="vertical" />
            <Anchor
              aria-label="TwitterX"
              href="https://x.com/alckordev"
              rel="noopener"
              display="inline-flex"
              target="_blank"
            >
              <ThemeIcon variant="transparent" color="white">
                <RiTwitterXFill size={18} />
              </ThemeIcon>
            </Anchor>
            <Divider orientation="vertical" />
            <Anchor
              aria-label="Tiktok"
              href="https://www.tiktok.com/@alckordev"
              rel="noopener"
              display="inline-flex"
              target="_blank"
            >
              <ThemeIcon variant="transparent" color="white">
                <RiTiktokFill size={18} />
              </ThemeIcon>
            </Anchor>
            <Divider orientation="vertical" />
            <Anchor
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/alckordev"
              rel="noopener"
              display="inline-flex"
              target="_blank"
            >
              <ThemeIcon variant="transparent" color="white">
                <RiLinkedinFill size={18} />
              </ThemeIcon>
            </Anchor>
          </Group>
          <Group>
            <Anchor component={Link} href="/terms-and-conditions" c="white">
              {t("terms_and_conditions")}
            </Anchor>
            <Anchor component={Link} href="/privacy-policy" c="white">
              {t("privacy_policy")}
            </Anchor>
          </Group>
        </Flex>
      </Container>
    </Box>
  );
};
