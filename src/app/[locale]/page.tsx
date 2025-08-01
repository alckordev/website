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
import { getTranslations } from "next-intl/server";
import NextImage from "next/image";

export async function generateMetadata() {
  return {
    title: "Isco — Software developer",
    description: "I have followed setup instructions carefully",
  };
}

export default async function Page() {
  const t = await getTranslations();

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
          alt="Isco — Software developer"
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
          Franc
          <Text
            component="span"
            c="brand-blue"
            fz="inherit"
            ff="inherit"
            fw="inherit"
          >
            isco
          </Text>
        </Title>
        <Text mb={32}>{t("introduction")}</Text>
        <Link href="/blog">
          <Button component="span">{t("start_reading")}</Button>
        </Link>
      </Stack>
    </Flex>
  );
}
