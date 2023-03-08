import React, { Fragment } from "react";
import { UI, useColorModeValue, useDisclosure, CIcon, icon } from "@myth/ui";
import { Disqus, DisqusCount } from "./Disqus";

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
              borderColor={useColorModeValue("gray.200", "gray.900")}
            />
          }
          spacing={4}
          bg={useColorModeValue("white", "gray.800")}
          px={4}
          py={3}
          boxShadow="xl"
          rounded="3xl"
        >
          <UI.Button
            leftIcon={<CIcon icon={icon.riLikeLine} />}
            size="sm"
            variant="link"
          >
            20K
          </UI.Button>
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
          <UI.DrawerCloseButton />
          <UI.DrawerHeader>title</UI.DrawerHeader>
          <UI.DrawerBody>
            <UI.Stack spacing={10} my={16} align="center">
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
