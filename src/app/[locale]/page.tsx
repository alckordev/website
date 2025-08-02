import { Link } from "@/i18n/navigation";
import { getOpenGraph, getTwitter } from "@/lib/server";
import { Params } from "@/type";
import {
  AspectRatio,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import NextImage from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = `Isco • ${t("software_developer")}`;
  const description = t("introduction");

  return {
    title,
    description,
    category: t("software_developer"),
    openGraph: getOpenGraph(title, description, locale),
    twitter: getTwitter(),
  };
}

export default async function Page() {
  const t = await getTranslations();

  return (
    <Flex align="center" justify="center" h="100%" gap="xl" direction="column">
      <AspectRatio
        ratio={455 / 576}
        pos="relative"
        maw={{ base: 278, sm: 455 }}
        w="100%"
        h={{ base: 352, sm: 576 }}
        mx="auto"
      >
        <Image
          component={NextImage}
          src="/images/me-coffee.png"
          alt="Isco — Software developer"
          priority
          style={{
            WebkitMaskImage: "linear-gradient(#000 50%, #0000)",
            objectFit: "cover",
          }}
          fallbackSrc="https://placehold.co/455x576"
          fill
          sizes="(max-width: 455px) 100vw, 455px"
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
