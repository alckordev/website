import React, { Fragment } from "react";
import { UI, useColorModeValue, useDisclosure, CIcon, icon } from "@myth/ui";
import { Disqus, DisqusCount, DisqusThreadLikes } from "./Disqus";

interface Props {
  title?: string;
  slug?: string;
}

export const PostFooter = ({ title, slug }: Props) => {
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
          px={4}
          py={3}
          boxShadow="xl"
          rounded="3xl"
        >
          <DisqusThreadLikes identifier={slug ?? ""} />
          <UI.Button
            leftIcon={<CIcon icon={icon.riChatLine} />}
            size="sm"
            variant="link"
            onClick={onOpen}
          >
            <DisqusCount identifier={slug ?? ""} onlyNumber />
          </UI.Button>
          <UI.IconButton
            aria-label="Compartir"
            icon={<CIcon icon={icon.riShareLine} />}
            size="sm"
            variant="link"
          />
        </UI.HStack>
      </UI.Flex>

      <UI.Drawer onClose={onClose} isOpen={isOpen} size="sm">
        <UI.DrawerOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" />
        <UI.DrawerContent>
          <UI.DrawerCloseButton top={4} />
          <UI.DrawerHeader>
            Comentarios: <DisqusCount identifier={slug ?? ""} onlyNumber />
          </UI.DrawerHeader>
          <UI.DrawerBody>
            <UI.Stack spacing={10} align="center">
              {slug && title && (
                <Disqus
                  shortname="alckordev"
                  config={{
                    url: `http://localhost:3000/${slug}`,
                    identifier: slug ?? "",
                    title: title ?? "",
                  }}
                />
              )}
            </UI.Stack>
          </UI.DrawerBody>
        </UI.DrawerContent>
      </UI.Drawer>
    </Fragment>
  );
};
