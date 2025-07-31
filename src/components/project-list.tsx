import { getPinnedRepos } from "@/lib/server/github";
import {
  Anchor,
  Box,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { RiGitForkFill, RiStarFill } from "@remixicon/react";
import { getTranslations } from "next-intl/server";

export const ProjectList = async () => {
  const t = await getTranslations();

  const repos = await getPinnedRepos();

  return (
    <Box>
      <Title order={4} mb="lg">
        {t("my_open_source_projects")}
      </Title>
      <Stack>
        {repos.map((r) => (
          <Anchor
            key={r.url}
            href={r.url}
            target="_blank"
            c="white"
            style={{ textDecoration: "none" }}
          >
            <Title order={4}>{r.name}</Title>
            <Text c="brand-gray.3" mb="xs" truncate>
              {r.description}
            </Text>
            <Group>
              <UnstyledButton
                sx={{ display: "flex", alignItems: "center", gap: 4 }}
              >
                <ThemeIcon variant="transparent" size={20} c="yellow">
                  <RiStarFill size={20} />
                </ThemeIcon>
                {r.stargazerCount}
              </UnstyledButton>
              <UnstyledButton
                sx={{ display: "flex", alignItems: "center", gap: 4 }}
              >
                <ThemeIcon variant="transparent" size={20} c="brand-gray.3">
                  <RiGitForkFill size={20} />
                </ThemeIcon>
                {r.forkCount}
              </UnstyledButton>
            </Group>
          </Anchor>
        ))}
      </Stack>

      {/* <Anchor href="https://github.com/iscodex/culqi-nodejs" target="_blank">
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
      </Anchor> */}
    </Box>
  );
};
