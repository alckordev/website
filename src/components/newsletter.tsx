"use client";

import { Link } from "@/i18n/navigation";
import {
  Anchor,
  Button,
  Card,
  Checkbox,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
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

  const handleSubscribe = (values: typeof form.values | null) => {
    console.log(values);
  };

  return (
    <Card bg="transparent" p={0}>
      <Title order={4} mb="lg">
        {t("subscribe_now")}
      </Title>
      <form onSubmit={form.onSubmit(handleSubscribe)}>
        <Stack>
          <TextInput
            type="email"
            placeholder="your@email.com"
            radius="xl"
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
          <Button type="submit" radius="xl" disabled={!form.isValid()}>
            {t("subscribe")}
          </Button>
        </Stack>
      </form>
    </Card>
  );
};
