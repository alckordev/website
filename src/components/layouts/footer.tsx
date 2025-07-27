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
          <Text>© 2025 - alckordev</Text>
          <Group gap="xs">
            <Anchor
              aria-label="Github"
              href="https://discord.com/invite/yVyTtCRueq"
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
              href="https://discord.com/invite/yVyTtCRueq"
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
              href="https://discord.com/invite/yVyTtCRueq"
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
              aria-label="Discord"
              href="https://discord.com/invite/yVyTtCRueq"
              rel="noopener"
              display="inline-flex"
              target="_blank"
            >
              <ThemeIcon variant="transparent" color="white">
                <RiDiscordFill size={18} />
              </ThemeIcon>
            </Anchor>
          </Group>
        </Flex>
      </Container>
    </Box>
  );
};
