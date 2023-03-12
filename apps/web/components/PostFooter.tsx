import React, { Fragment } from "react";
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
      <UI.Flex pos="sticky" bottom={6} align="center" justify="center">
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
          bg={useColorModeValue("white", "black")}
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

      <UI.Drawer onClose={onClose} isOpen={isOpen} size="sm">
        <UI.DrawerOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" />
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
