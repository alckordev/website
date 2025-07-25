import { DevTechGrid } from "@/components/dev-tech-grid";
import {
  AspectRatio,
  Box,
  Divider,
  Flex,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import NextImage from "next/image";

export default function Home() {
  return (
    <Flex align="center" h="100%" gap="xl">
      <Stack flex={1} mx="auto" maw="720">
        <Title order={1} fz={{ base: "60px", md: "80px", xl: "100px" }}>
          Francisco
        </Title>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
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
      <Box ms="xl" display={{ base: "none", lg: "block" }}>
        <AspectRatio ratio={530 / 727} maw={530} mx="auto">
          <Image
            component={NextImage}
            src="https://wordpress.validthemes.net/ambrox/wp-content/uploads/2023/01/1.png"
            alt=""
            width={530}
            height={727}
            priority
            style={{
              WebkitMaskImage: "linear-gradient(#000 50%, #0000)",
            }}
          />
        </AspectRatio>
      </Box>
    </Flex>
  );
}
