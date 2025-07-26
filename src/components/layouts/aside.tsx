"use client";

import React from "react";
import {
  Anchor,
  AspectRatio,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Image,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import z from "zod/v4";
import NextImage from "next/image";
import { Link } from "@/i18n/navigation";

export const Aside = () => {
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
    <Stack
      display={{ base: "none", lg: "flex" }}
      miw={380}
      maw={380}
      mih="100%"
      mx="auto"
      py={50}
      ps={{ base: "md", lg: "xl" }}
      pe="md"
      gap="xl"
      style={{
        borderLeft: "1px solid var(--mantine-accent-surface)",
      }}
    >
      <Stack gap="xl">
        <Card bg="transparent" p={0}>
          <Title order={4} mb="lg">
            Latest project
          </Title>
          <Anchor
            href="https://github.com/iscodex/culqi-nodejs"
            target="_blank"
          >
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
      </Stack>
      <Divider color="var(--mantine-accent-surface)" />
      <Stack gap="xl" pos="sticky" top={120}>
        <Card bg="transparent" p={0}>
          <Title order={4} mb="lg">
            Recommended topics
          </Title>
          <Flex gap="xs" wrap="wrap">
            {topics.map((topic) => (
              <Button
                key={topic.slug}
                component={Link}
                href={`/topics/${topic.slug}`}
                variant="light"
                radius="xl"
              >
                {topic.label}
              </Button>
            ))}
          </Flex>
        </Card>
        <Divider color="var(--mantine-accent-surface)" />
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
      </Stack>
    </Stack>
  );
};

type Topic = {
  label: string;
  slug: string;
};

const topics: Topic[] = [
  {
    label: "Firebase",
    slug: "firebase",
  },
  {
    label: "Supabase",
    slug: "supabase",
  },
  {
    label: "Github",
    slug: "github",
  },
  {
    label: "Next.js",
    slug: "nextjs",
  },
  {
    label: "Nest JS",
    slug: "nestjs",
  },
  {
    label: "Chakra UI",
    slug: "chakra-ui",
  },
  {
    label: "Ark UI",
    slug: "ark-ui",
  },
  {
    label: "JWT",
    slug: "jwt",
  },
  {
    label: "API Rest",
    slug: "api-rest",
  },

  {
    label: "ASP.NET",
    slug: "aspnet",
  },
  {
    label: "React Table",
    slug: "react-table",
  },
  {
    label: "React Query",
    slug: "react-query",
  },
];
