"use client";

import { Anchor, Box, Button, Container, Flex } from "@mantine/core";
import { Link } from "@/i18n/navigation";

export const Header = () => {
  return (
    <Box
      component="header"
      bg="var(--mantine-accent-background)"
      pos="sticky"
      top={0}
      style={{
        borderBottom: "1px solid var(--mantine-accent-surface)",
        zIndex: 101,
      }}
    >
      <Container size="xl">
        <Flex mih="70px" justify="space-between" align="center">
          <Anchor component={Link} href="/" c="white" underline="never">
            Logo
          </Anchor>
          <Flex gap={32} align="center">
            <Anchor component={Link} href="/blog" c="white" underline="never">
              Blog
            </Anchor>
            <Button radius="xl">Sign in</Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
