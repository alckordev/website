import NextLink from "next/link";
import { UI, CIcon, icon, motion, useColorModeValue } from "@myth/ui";

export const Hits = ({ hits }: any) => {
  console.log("hits", hits);

  const color = useColorModeValue("blackAlpha.500", "whiteAlpha.500");

  if (!hits.length) return null;

  return (
    <UI.ModalBody flex="1 1 0%" maxH="66vh" overflow="hidden" p={0}>
      <UI.Box px={4}>
        <UI.VStack spacing={0} pt={4} borderTop={1} borderStyle="solid">
          {hits.map((hit: any, idx: number) => (
            <UI.Link
              as={NextLink}
              key={idx}
              href={hit.url}
              w="100%"
              _hover={{ textDecor: "none" }}
            >
              <UI.Flex
                as={motion.div}
                initial="normal"
                whileHover="hover"
                variants={{
                  normal: {
                    backgroundColor: "transparent",
                  },
                  hover: {
                    backgroundColor: "red",
                  },
                }}
                gap={4}
                align="center"
                px={4}
                py={2}
                rounded="md"
              >
                <UI.Box
                  as={CIcon}
                  icon={icon[hit.icon]}
                  size="lg"
                  color={color}
                />
                <UI.Box>
                  <UI.Text
                    dangerouslySetInnerHTML={{
                      __html: hit._highlightResult.name.value,
                    }}
                  />
                  <UI.Text
                    dangerouslySetInnerHTML={{
                      __html: hit._highlightResult.category.value,
                    }}
                    color={color}
                  />
                </UI.Box>
              </UI.Flex>
            </UI.Link>
          ))}
        </UI.VStack>
      </UI.Box>
    </UI.ModalBody>
  );
};
