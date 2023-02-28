import NextLink from "next/link";
import { UI } from "@myth/ui";
import tags from "../data/tags";
import { Newsletter } from "./Newsletter";

export const AsideRight = () => {
  return (
    <UI.VStack
      divider={<UI.StackDivider borderColor="gray.700" />}
      spacing={10}
    >
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
