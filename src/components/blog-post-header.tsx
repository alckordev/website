import { formatDate } from "@/lib/client";
import { Frontmatter, Scope } from "@/type";
import {
  AspectRatio,
  Group,
  Image,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { RiCalendar2Line, RiTimeLine } from "@remixicon/react";
import { useTranslations } from "next-intl";
import NextImage from "next/image";

export const BlogPostHeader = ({
  scope,
  locale,
}: {
  scope: Frontmatter & Scope;
  locale: string;
}) => {
  const t = useTranslations();

  return (
    <Stack gap="xl" mb="xl">
      <Title order={1} textWrap="balance">
        {scope.title}
      </Title>
      <Group>
        <Text
          component="time"
          dateTime={scope.publishedAt}
          display="inline-flex"
          style={{ alignItems: "center" }}
        >
          <ThemeIcon
            component="span"
            variant="transparent"
            c="gray.3"
            size="sm"
            me={4}
          >
            <RiCalendar2Line />
          </ThemeIcon>
          {formatDate(scope.publishedAt, locale)}
        </Text>
        <Text display="inline-flex" style={{ alignItems: "center" }}>
          <ThemeIcon
            component="span"
            variant="transparent"
            c="gray.3"
            size="sm"
            me={4}
          >
            <RiTimeLine />
          </ThemeIcon>
          {t("reading_time", { count: Math.max(1, Math.round(scope.reading)) })}
        </Text>
      </Group>
      <AspectRatio
        pos="relative"
        ratio={728 / 420}
        maw={{ sm: 728, md: 790 }}
        w="100%"
        h={{ base: 300, sm: 390, md: 420 }}
      >
        <Image
          component={NextImage}
          src="https://placehold.co/728x420"
          alt=""
          radius="md"
          fill
          sizes="(max-width: 790px) 100vw, 790px"
          style={{
            objectFit: "cover",
          }}
          priority
        />
      </AspectRatio>
    </Stack>
  );
};
