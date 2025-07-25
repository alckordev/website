import { Anchor, Box, Button, Container, Flex } from "@mantine/core";
import Link from "next/link";

export const Header = () => {
  return (
    <Box
      component="header"
      style={{ borderBottom: "1px solid var(--mantine-color-brand-dark-6)" }}
    >
      <Container size="xl">
        <Flex mih="70px" justify="space-between" align="center">
          <div>here</div>
          <Flex gap={32} align="center">
            <Anchor component={Link} href="/" c="white" underline="never">
              Home
            </Anchor>
            <Anchor component={Link} href="/blog" c="white" underline="never">
              Blog
            </Anchor>
            <Button
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
              radius="xl"
            >
              Sign in
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
