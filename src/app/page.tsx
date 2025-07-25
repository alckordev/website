import { DevTechGrid } from "@/components/dev-tech-grid";
import { Container, Divider, Flex, Stack, Text, Title } from "@mantine/core";

export default function Home() {
  return (
    <Container size="xl" h="100%">
      <Flex align="center" h="100%">
        <Stack maw="720px">
          <Title order={1} textWrap="balance">
            Francisco
          </Title>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Text>
          <Divider
            my="xs"
            label="Tecnologías"
            labelPosition="left"
            color="brand-dark.6"
            style={{
              "--mantine-color-dimmed": "var(--mantine-color-brand-gray-3)",
            }}
          />
          <DevTechGrid />
        </Stack>
      </Flex>
    </Container>
  );
}
