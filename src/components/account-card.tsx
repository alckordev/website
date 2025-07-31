"use client";

import { destroySession } from "@/app/actions/auth";
import { useRouter } from "@/i18n/navigation";
import firebase from "@/lib/client/firebase";
import { User } from "@/type";
import {
  Avatar,
  Box,
  Button,
  Card,
  CopyButton,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { RiGithubFill, RiGoogleFill } from "@remixicon/react";
import {
  deleteUser,
  GithubAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithPopup,
  signOut,
} from "firebase/auth";
import { useTranslations } from "next-intl";
import { modals } from "@mantine/modals";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { FirebaseError } from "firebase/app";

const google = new GoogleAuthProvider();
const github = new GithubAuthProvider();

export const AccountCard = ({ user }: { user: User }) => {
  const [deleting, setDeleting] = useState(false);

  const t = useTranslations();

  const router = useRouter();

  const providerIcon = {
    "google.com": <RiGoogleFill size={20} />,
    "github.com": <RiGithubFill size={20} />,
  };

  const handleReauth = async () => {
    const user = firebase.auth().currentUser;
    if (!user) throw new Error("No user");

    const providerId = user.providerData[0]?.providerId;
    const provider = providerId === "google.com" ? google : github;

    await reauthenticateWithPopup(user, provider);
  };

  const handleLogout = async () => {
    await signOut(firebase.auth());
    await destroySession();
    router.refresh();
  };

  const handleDeleteAccount = async () => {
    try {
      setDeleting(true);

      await handleReauth();
      await deleteUser(firebase.auth().currentUser!);
      await destroySession();

      router.refresh();
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof FirebaseError) {
        notifications.show({
          color: "red",
          title: err.code,
          message: err.message,
        });
      } else {
        notifications.show({
          color: "red",
          title: t("server_error"),
          message: t("server_error_notice"),
        });
      }
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteModal = () => {
    return modals.openConfirmModal({
      title: t("delete_your_account"),
      centered: true,
      children: <Text size="sm">{t("delete_account_notice")}</Text>,
      labels: { confirm: t("delete_account"), cancel: t("no_dont_delete_it") },
      confirmProps: { color: "red" },
      cancelProps: { variant: "light" },
      // onCancel: () => console.log("Cancel"),
      onConfirm: handleDeleteAccount,
    });
  };

  return (
    <Stack>
      <Card p={20}>
        <Group align="center">
          <Avatar
            src={user.picture}
            alt={user.displayName}
            size={70}
            radius="xl"
          />
          <Box>
            <Title order={3}>{user.displayName ?? "—"}</Title>
            <Group gap="xs">
              {user.providerData.map((p) => (
                <Avatar
                  key={p.providerId}
                  size={20}
                  color="gray"
                  radius="xl"
                  style={{ background: "transparent" }}
                >
                  {providerIcon[p.providerId]}
                </Avatar>
              ))}
            </Group>
          </Box>
        </Group>
        <Divider my="md" />
        <Stack gap="xs">
          <Field label={t("display_name")} value={user.displayName || "-"} />
          <Field
            label={t("email")}
            value={user.email || user.providerData[0].email || "-"}
            copyable
          />
        </Stack>
      </Card>
      <Group>
        <Button variant="light" onClick={handleLogout}>
          {t("sign_out")}
        </Button>
        <Button
          color="red"
          onClick={handleDeleteModal}
          loading={deleting}
          loaderProps={{ type: "infinity" }}
        >
          {t("delete_account")}
        </Button>
      </Group>
    </Stack>
  );
};

function Field({
  label,
  value,
  copyable,
}: {
  label: string;
  value: string;
  copyable?: boolean;
}) {
  return (
    <Group gap="lg" justify="space-between">
      <Box>
        <Text c="slate.5">{label}</Text>
        <Text truncate>{value}</Text>
      </Box>
      {copyable && (
        <CopyButton value={value}>
          {({ copied, copy }) => (
            <Button size="xs" variant="light" onClick={copy}>
              {copied ? "Copied" : "Copy"}
            </Button>
          )}
        </CopyButton>
      )}
    </Group>
  );
}
