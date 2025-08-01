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
    <Flex align="center" justify="center" h="100%" gap="xl" direction="column">
      <AspectRatio
        ratio={560 / 710}
        pos="relative"
        maw={{ base: 278, sm: 455, md: 535 }}
        w="100%"
        h={{ base: 352, sm: 576, md: 678 }}
        mx="auto"
      >
        <Image
          component={NextImage}
          src="/images/me.webp"
          alt="Francisco Software Developer"
          priority
          style={{
            WebkitMaskImage: "linear-gradient(#000 50%, #0000)",
            objectFit: "cover",
          }}
          fallbackSrc="https://placehold.co/560x710"
          fill
          sizes="(max-width: 560px) 100vw, 560px"
        />
      </AspectRatio>
      <Stack
        mx="auto"
        maw={728}
        align="center"
        mb={40}
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
