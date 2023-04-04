import { Fragment, useState } from "react";
import { UI, CIcon, icons } from "@myth/ui";
import { InstantSearch } from "react-instantsearch-dom";
import { algolia } from "../../lib/algolia";
import SearchBox from "./SearchBox";
import SearchHits from "./SearchHits";

export const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);

  const onClose = () => setIsOpen(false);

  return (
    <Fragment>
      <UI.Button
        w="100%"
        maxW="360px"
        colorScheme="gray"
        mx={6}
        p={3}
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
      </UI.Button>

      <UI.Modal onClose={onClose} isOpen={isOpen} size="3xl">
        <UI.ModalOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" />
        <UI.ModalContent>
          <InstantSearch searchClient={algolia} indexName="alckordev">
            <UI.ModalBody p={0}>
              <SearchBox />
              <SearchHits />
            </UI.ModalBody>
          </InstantSearch>
        </UI.ModalContent>
      </UI.Modal>
    </Fragment>
  );
};
