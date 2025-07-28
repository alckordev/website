"use client";

import { createSession } from "@/app/actions/auth";
import { Link } from "@/i18n/navigation";
import firebase from "@/lib/client/firebase";
import {
  Anchor,
  Box,
  Button,
  LoadingOverlay,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { RiGithubFill, RiGoogleFill, RiTerminalFill } from "@remixicon/react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useTranslations } from "next-intl";
import { useState } from "react";

const google = new GoogleAuthProvider();
const github = new GithubAuthProvider();

export const Login = () => {
  const t = useTranslations();

  const [loading, setLoading] = useState(false);

  const handleLoginWithGoogle = async () => {
    try {
      setLoading(true);

      const credentials = await signInWithPopup(firebase.auth(), google);
      const idToken = await credentials.user.getIdToken();

      await createSession(idToken);

      console.log("reload");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGithub = async () => {
    try {
      await signInWithPopup(firebase.auth(), github);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stack
      pos="relative"
      align="center"
      gap="xl"
      p="56 16 32"
      maw={420}
      mx="auto"
    >
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ blur: 2 }}
        loaderProps={{ type: "infinity" }}
      />
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
          onClick={handleLoginWithGoogle}
        >
          {t("sign_in_with", { social: "Google" })}
        </Button>
        <Button
          variant="light"
          justify="space-between"
          leftSection={<RiGithubFill size={20} />}
          rightSection={<Box w={20} />}
          onClick={handleLoginWithGithub}
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
