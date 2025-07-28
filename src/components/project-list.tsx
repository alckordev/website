import { Anchor, AspectRatio, Card, Image, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import NextImage from "next/image";

export const ProjectList = () => {
  const t = useTranslations();

  return (
    <Card bg="transparent" p={0}>
      <Title order={4} mb="lg">
        {t("latest_project")}
      </Title>
      <Anchor href="https://github.com/iscodex/culqi-nodejs" target="_blank">
        <AspectRatio ratio={330 / 300} maw={330}>
          <Image
            component={NextImage}
            src="https://placehold.co/330x300"
            alt="Culqi Node SDK (TypeScript)"
            width={330}
            height={300}
            radius="md"
          />
        </AspectRatio>
      </Anchor>
    </Card>
  );
};
