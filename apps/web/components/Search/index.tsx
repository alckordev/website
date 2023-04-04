import { Fragment, useEffect, useState } from "react";
import { UI, CIcon, icons } from "@myth/ui";
import isHotkey from "is-hotkey";
import { InstantSearch } from "react-instantsearch-hooks";
import { algolia } from "../../lib/algolia";

import { SearchBox } from "./SearchBox";

export const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);

  const onClose = () => setIsOpen(false);

  //   useEffect(() => {
  //     const handleKeyDown = (event: KeyboardEvent) => {
  //       event.preventDefault();

  //       const isCtrlK = isHotkey("ctrl+k", event);

  //       if (isCtrlK) onOpen();

  //       console.log(event);
  //     };

  //     document.addEventListener("keydown", handleKeyDown);

  //     return () => {
  //       document.removeEventListener("keydown", handleKeyDown);
  //     };
  //   }, []);

  return (
    <Fragment>
      <UI.Flex
        as="button"
        display="flex"
        w="100%"
        maxW="300px"
        bg="gray.900"
        color="gray.500"
        mx={6}
        p={3}
        align="center"
        rounded="md"
        boxShadow="base"
        onClick={onOpen}
      >
        <UI.Box as={CIcon} icon={icons.riSearchLine} />
        <UI.HStack ml={3} align="center" w="100%">
          <UI.Text flex={1} textAlign="left">
            Buscar...
          </UI.Text>
          <UI.HStack spacing={1}>
            <UI.Kbd>Ctrl</UI.Kbd>
            <UI.Kbd>K</UI.Kbd>
          </UI.HStack>
        </UI.HStack>
      </UI.Flex>

      <UI.Modal onClose={onClose} isOpen={isOpen} size="xl">
        <UI.ModalOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" />
        <UI.ModalContent
          top="4vh"
          maxHeight="calc(100% - 7.5rem)"
          boxShadow="lg"
          rounded="md"
        >
          <InstantSearch searchClient={algolia} indexName="alckordev">
            <SearchBox />
          </InstantSearch>
        </UI.ModalContent>
      </UI.Modal>
    </Fragment>
  );
};
