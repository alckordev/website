"use client";

import {
  alpha,
  Anchor,
  Box,
  Button,
  Container,
  Flex,
  Image,
} from "@mantine/core";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
// import NextImage from "next/image";

export const Header = () => {
  const t = useTranslations();

  return (
    <Box
      component="header"
      bg={alpha("var(--mantine-color-dark-9)", 0.8)}
      pos="sticky"
      top={0}
      style={{
        backdropFilter: "saturate(100%) blur(10px)",
        boxShadow: `inset 0 -1px 0 0 ${alpha(
          "var(--mantine-color-dark-7)",
          0.3
        )}`,
        zIndex: 101,
      }}
    >
      <Container size="xl">
        <Flex mih={70} mah={70} justify="space-between" align="center">
          <Flex align="center">
            <Anchor component={Link} href="/" w={{ base: 36, sm: 180 }} h={34}>
              <Image
                // component={NextImage}
                src="/images/logo.svg"
                alt="Logo"
                width={180}
                height={34}
                style={{
                  objectPosition: "left",
                  objectFit: "cover",
                }}
              />
            </Anchor>
          </Flex>

          <Button component={Link} href="/blog">
            {t("start_reading")}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};
