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
      <UI.Flex align="center" direction="column" gap={4}>
        <UI.Image
          borderWidth={8}
          borderStyle="solid"
          borderColor="gray.100"
          borderRadius="full"
          boxSize="150px"
          src="assets/avatar.jpg"
          alt="Francisco Luis"
          boxShadow="lg"
        />
        <UI.Heading as="h2" fontSize="lg">
          Francisco Luis
        </UI.Heading>
        <UI.Text textAlign="center">
          Ingeniero de sistemas de profesión, especializado en el desarrollo de
          proyectos de software con más de 10 años de experiencia.
        </UI.Text>
      </UI.Flex>
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
      <UI.Box position="sticky" top="80px">
        <Newsletter />
      </UI.Box>
    </UI.VStack>
  );
};
