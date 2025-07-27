import { Link } from "@/i18n/navigation";
import { Button, Card, Flex, Title } from "@mantine/core";

export const TopicList = () => {
  return (
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
