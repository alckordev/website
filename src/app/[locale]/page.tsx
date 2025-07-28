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
import { useTranslations } from "next-intl";
import NextImage from "next/image";

export default function Page() {
  const t = useTranslations();

  return (
    <Flex align="center" h="100%" gap="xl">
      <Stack flex={1} mx="auto" maw="720">
        <Title order={1} fz={{ base: "60px", md: "80px", xl: "100px" }}>
          Francisco
        </Title>
        <Text>{t("introduction")}</Text>
        <Divider
          my="xs"
          label={t("technologies")}
          labelPosition="left"
          style={{
            "--mantine-color-dimmed": "var(--mantine-color-text)",
          }}
        />
        <DevTechGrid />
      </Stack>
      <Box ms="xl" display={{ base: "none", lg: "block" }}>
        <AspectRatio ratio={530 / 727} maw={530} mx="auto">
          <Image
            component={NextImage}
            src="https://placehold.co/530x727"
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
