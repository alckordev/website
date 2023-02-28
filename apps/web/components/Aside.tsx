import NextLink from "next/link";
import { UI } from "@myth/ui";
import tags from "../data/tags";
import { Newsletter } from "./Newsletter";

export const Aside = () => {
  return (
    <UI.VStack
      divider={<UI.StackDivider borderColor="gray.700" />}
      spacing={10}
    >
      <UI.Card variant="outline">
        <UI.CardHeader>
          <UI.Flex gap={4} alignItems="center" flexWrap="wrap">
            <UI.Avatar
              name="Francisco Luis Rios Vega"
              src="assets/avatar.jpg"
            />
            <UI.Box>
              <UI.Heading size="sm">Francisco</UI.Heading>
              <UI.Text>Fullstack Developer</UI.Text>
            </UI.Box>
          </UI.Flex>
        </UI.CardHeader>
        <UI.CardBody>
          <UI.Text>
            Ingeniero de sistemas de profesión, especializado en el desarrollo
            de proyectos de software con más de 10 años de experiencia.
          </UI.Text>
        </UI.CardBody>
      </UI.Card>
      <UI.Box>
        <UI.Heading as="h2" fontSize="lg" mb={4}>
          Tags
        </UI.Heading>
        <UI.Flex flexWrap="wrap" gap={2}>
          {tags.map((tag, idx) => (
            <UI.Tag
              key={idx}
              as={NextLink}
              href={`tag/${tag.slug}`}
              colorScheme="purple"
            >
              {tag.name}
            </UI.Tag>
          ))}
        </UI.Flex>
      </UI.Box>
      <UI.Box>
        <Newsletter />
      </UI.Box>
    </UI.VStack>
  );
};
