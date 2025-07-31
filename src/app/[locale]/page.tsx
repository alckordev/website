"use client";

import { Link } from "@/i18n/navigation";
import {
  AspectRatio,
  Button,
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
    <Flex
      align="center"
      h="100%"
      gap="xl"
      direction={{ base: "row", md: "column" }}
    >
      <AspectRatio
        ratio={367 / 580}
        maw={367}
        mx="auto"
        display={{ base: "none", md: "block" }}
      >
        <Image
          component={NextImage}
          src="https://placehold.co/367x580"
          alt=""
          width={367}
          height={580}
          priority
          style={{
            WebkitMaskImage: "linear-gradient(#000 50%, #0000)",
            objectFit: "cover",
          }}
          fallbackSrc="https://placehold.co/367x580"
        />
      </AspectRatio>
      <Stack
        mx="auto"
        maw={728}
        align="center"
        pos={{ base: "static", md: "absolute" }}
        top={{ base: 0, md: "50%" }}
        mb={32}
        style={{ textAlign: "center" }}
      >
        <Title
          order={1}
          fz={{ base: 32, md: 40, xl: 48 }}
          style={{ textTransform: "uppercase" }}
        >
          Francisco
        </Title>
        <Text mb={32}>{t("introduction")}</Text>
        <Button component={Link} href="/blog">
          {t("start_reading")}
        </Button>
      </Stack>
    </Flex>
  );
}
