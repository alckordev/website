"use client";

import {
  ActionIcon,
  alpha,
  Anchor,
  Avatar,
  Box,
  Container,
  Flex,
  Menu,
  ThemeIcon,
} from "@mantine/core";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { RiShutDownLine, RiTerminalFill, RiUserLine } from "@remixicon/react";
import { User } from "@/type";
import { signOut } from "firebase/auth";
import firebase from "@/lib/client/firebase";
import { destroySession } from "@/app/actions/auth";
import { LoginButton } from "../login-button";

export const Header = ({ user }: { user: User | null }) => {
  const t = useTranslations();

  const router = useRouter();

  const handleLogout = async () => {
    await signOut(firebase.auth());
    await destroySession();
    router.refresh();
  };

  return (
    <Box
      component="header"
      bg={alpha("var(--mantine-color-dark-9)", 0.8)}
      pos="sticky"
      top={0}
      style={{
        backdropFilter: "saturate(100%) blur(10px)",
        boxShadow: `inset 0 -1px 0 0 ${alpha(
          "var(--mantine-color-dark-7)",
          0.3
        )}`,
        zIndex: 101,
      }}
    >
      <Container size="xl">
        <Flex mih={70} mah={70} justify="space-between">
          <Flex gap={32} align="center">
            <Anchor
              component={Link}
              href="/"
              c="white"
              underline="never"
              display="inline-flex"
              ff="family.headings"
              fw="bold"
              size="xl"
              style={{
                alignItems: "center",
              }}
            >
              <ThemeIcon
                variant="gradient"
                radius="md"
                gradient={{ from: "white", to: "gray.1", deg: 0 }}
                c="brand-blue"
                me="xs"
              >
                <RiTerminalFill />
              </ThemeIcon>
              alckor.dev
            </Anchor>
          </Flex>
          <Flex gap={32} align="center">
            <Anchor component={Link} href="/blog" c="white" underline="never">
              {t("blog")}
            </Anchor>
            {!user ? (
              <LoginButton />
            ) : (
              <Menu position="bottom-end" withArrow>
                <Menu.Target>
                  <ActionIcon variant="transparent" c="white" size="compact-md">
                    <Avatar
                      name={user.name}
                      src={user.picture}
                      alt={user.name}
                    />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    component={Link}
                    href="/account"
                    leftSection={<RiUserLine size={16} />}
                  >
                    {t("my_account")}
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    leftSection={<RiShutDownLine size={16} />}
                    onClick={handleLogout}
                  >
                    {t("sign_out")}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
