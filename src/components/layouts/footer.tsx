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
  RiDiscordFill,
  RiGithubFill,
  RiTiktokFill,
  RiTwitterXFill,
} from "@remixicon/react";

export const Footer = () => {
  return (
    <Box
      component="footer"
      style={{ borderTop: "1px solid var(--mantine-color-brand-dark-6)" }}
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
          <Text>© 2025 - alckordev</Text>
          <Group gap="xs">
            <Anchor
              aria-label="Github"
              href="https://discord.com/invite/yVyTtCRueq"
              rel="noopener"
              display="inline-flex"
            >
              <ThemeIcon variant="transparent" color="brand-gray.3">
                <RiGithubFill size={18} />
              </ThemeIcon>
            </Anchor>
            <Divider orientation="vertical" />
            <Anchor
              aria-label="TwitterX"
              href="https://discord.com/invite/yVyTtCRueq"
              rel="noopener"
              display="inline-flex"
            >
              <ThemeIcon variant="transparent" color="brand-gray.3">
                <RiTwitterXFill size={18} />
              </ThemeIcon>
            </Anchor>
            <Divider orientation="vertical" />
            <Anchor
              aria-label="Tiktok"
              href="https://discord.com/invite/yVyTtCRueq"
              rel="noopener"
              display="inline-flex"
            >
              <ThemeIcon variant="transparent" color="brand-gray.3">
                <RiTiktokFill size={18} />
              </ThemeIcon>
            </Anchor>
            <Divider orientation="vertical" />
            <Anchor
              aria-label="Discord"
              href="https://discord.com/invite/yVyTtCRueq"
              rel="noopener"
              display="inline-flex"
            >
              <ThemeIcon variant="transparent" color="brand-gray.3">
                <RiDiscordFill size={18} />
              </ThemeIcon>
            </Anchor>
          </Group>
        </Flex>
      </Container>
    </Box>
  );
};
