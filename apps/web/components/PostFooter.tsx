import { Fragment } from "react";
import {
  UI,
  useColorModeValue,
  useDisclosure,
  CIcon,
  icon,
  SharedButton,
} from "@myth/ui";
import { Disqus, DisqusCount, DisqusThreadLikes } from "./Disqus";

export const PostFooter = ({ thread }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <UI.Flex pos="sticky" bottom={6} my={16} align="center" justify="center">
        <UI.HStack
          divider={
            <UI.StackDivider
              borderColor={useColorModeValue(
                "blackAlpha.200",
                "whiteAlpha.200"
              )}
            />
          }
          spacing={4}
          bg={useColorModeValue("white", "gray.958")}
          px={8}
          py={2}
          minH={50}
          boxShadow="xl"
          rounded="3xl"
        >
          <DisqusThreadLikes identifier={thread.key} />
          <UI.Button
            leftIcon={<CIcon icon={icon.riChatLine} />}
            size="sm"
            variant="link"
            onClick={onOpen}
            _hover={{ textDecor: "none" }}
          >
            <DisqusCount identifier={thread.key} onlyNumber />
          </UI.Button>
          <SharedButton url={thread.link} />
        </UI.HStack>
      </UI.Flex>
      <UI.Divider
        my={8}
        borderColor={useColorModeValue("gray.200", "gray.958")}
        opacity={1}
      />

      <UI.Box pt="24px" pb="36px" mx="24px" mb="24px">
        <UI.Heading as="h2" size="md" fontWeight="medium">
          ¿Te gustó lo que leíste?
        </UI.Heading>
        <UI.Flex
          pt={3}
          justify="space-between"
          align="center"
          direction={["column", "column", "row", "row"]}
        >
          <UI.Box maxW={["100%", "100%", 425, 425]} pr={[0, 0, 4, 4]}>
            <UI.Text fontSize="sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              id massa in elit eleifend luctus.
            </UI.Text>
          </UI.Box>
          <UI.Box pt={[4, 4, 0, 0]}>
            <UI.Button
              as={UI.Link}
              leftIcon={<CIcon icon={icon.riCupLine} />}
              href="https://paypal.me/alckor127"
              isExternal
              colorScheme="teal"
              rounded="3xl"
              _hover={{ textDecor: "none" }}
            >
              Invitame un café
            </UI.Button>
          </UI.Box>
        </UI.Flex>
      </UI.Box>

      <UI.Drawer onClose={onClose} isOpen={isOpen} size="md">
        <UI.DrawerOverlay bg="blackAlpha.600" />
        {/* <UI.DrawerOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" /> */}
        <UI.DrawerContent>
          <UI.DrawerCloseButton top={4} />
          <UI.DrawerHeader>
            Comentarios: <DisqusCount identifier={thread.key} onlyNumber />
          </UI.DrawerHeader>
          <UI.DrawerBody>
            <UI.Stack spacing={10} align="center">
              <Disqus shortname="alckordev" identifier={thread.key} />
            </UI.Stack>
          </UI.DrawerBody>
        </UI.DrawerContent>
      </UI.Drawer>
    </Fragment>
  );
};
