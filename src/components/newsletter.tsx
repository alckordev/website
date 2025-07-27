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
import React from "react";
import z from "zod/v4";

export const Newsletter = () => {
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
        Subscribe now!
      </Title>
      <form onSubmit={form.onSubmit(handleSubscribe)}>
        <Stack>
          <TextInput
            variant="filled"
            type="email"
            placeholder="your@email.com"
            radius="xl"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <Checkbox
            label={
              <React.Fragment>
                I accept{" "}
                <Anchor
                  component={Link}
                  href="https://mantine.dev"
                  target="_blank"
                >
                  terms and conditions
                </Anchor>
              </React.Fragment>
            }
            key={form.key("terms")}
            {...form.getInputProps("terms", { type: "checkbox" })}
          />
          <Button type="submit" radius="xl" disabled={!form.isValid()}>
            Subscribe
          </Button>
        </Stack>
      </form>
    </Card>
  );
};
