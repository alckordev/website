import { Link } from "@/i18n/navigation";
import {
  Anchor,
  Box,
  Button,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { RiGithubFill, RiGoogleFill, RiTerminalFill } from "@remixicon/react";
import { useTranslations } from "next-intl";

export const Login = () => {
  const t = useTranslations();

  return (
    <Stack align="center" gap="xl" p="56 16 32">
      <Box style={{ textAlign: "center" }}>
        <ThemeIcon
          variant="gradient"
          size="xl"
          aria-label="Gradient action icon"
          gradient={{ from: "white", to: "gray.1", deg: 0 }}
          c="accent"
          mb={20}
        >
          <RiTerminalFill />
        </ThemeIcon>
        <Text>{t("welcome_back")}</Text>
        <Title order={2}>{t("sign_in")}</Title>
      </Box>
      <Stack w="100%" maw={300}>
        <Button
          variant="light"
          justify="space-between"
          leftSection={<RiGoogleFill size={20} />}
          rightSection={<Box w={20} />}
        >
          {t("sign_in_with", { social: "Google" })}
        </Button>
        <Button
          variant="light"
          justify="space-between"
          leftSection={<RiGithubFill size={20} />}
          rightSection={<Box w={20} />}
        >
          {t("sign_in_with", { social: "Github" })}
        </Button>
      </Stack>
      <Box style={{ textAlign: "center" }}>
        <Text>
          {t.rich("login_notice", {
            terms: (chunks) => (
              <Anchor
                component={Link}
                href="/terms-and-conditions"
                target="_blank"
              >
                {chunks}
              </Anchor>
            ),
            privacy: (chunks) => (
              <Anchor component={Link} href="/privacy-policy" target="_blank">
                {chunks}
              </Anchor>
            ),
          })}
        </Text>
      </Box>
    </Stack>
  );
};
