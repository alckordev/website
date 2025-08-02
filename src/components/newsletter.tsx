"use client";

import { Link } from "@/i18n/navigation";
import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useTranslations } from "next-intl";
import React from "react";
import z from "zod/v4";

export const Newsletter = () => {
  const t = useTranslations();

  const form = useForm({
    initialValues: {
      email: "",
      terms: false,
    },
    validate: zod4Resolver(
      z.object({
        email: z.email(),
        terms: z.literal(true),
      })
    ),
  });

  const handleSubscribe = async (values: typeof form.values | null) => {
    const fetched = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, status: "subscribed" }),
    });

    const res = await fetched.json();

    console.log(res.status);

    if ([200, 400].includes(res.status)) {
      notifications.show({
        title: t("subscription"),
        message:
          res.status === 200
            ? t("subscribe_success_new")
            : t("subscribe_already"),
      });

      form.reset();

      return;
    }

    notifications.show({
      title: t("subscription"),
      message: t("server_error"),
      color: "red",
    });
  };

  return (
    <Box>
      <Title order={4} mb="lg">
        {t("subscribe_now")}
      </Title>
      <form onSubmit={form.onSubmit(handleSubscribe)}>
        <Stack>
          <TextInput
            suppressHydrationWarning
            type="email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />

          <Checkbox
            label={t.rich("accept_terms", {
              link: (chunks) => (
                <Anchor
                  component={Link}
                  href="https://mantine.dev"
                  target="_blank"
                >
                  {chunks}
                </Anchor>
              ),
            })}
            key={form.key("terms")}
            {...form.getInputProps("terms", { type: "checkbox" })}
          />
          <Button
            type="submit"
            disabled={!form.isValid()}
            loading={form.submitting}
            loaderProps={{ type: "infinity" }}
          >
            {t("subscribe")}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
