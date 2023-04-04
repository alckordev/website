import { connectSearchBox } from "react-instantsearch-dom";
import { UI, CIcon, icons } from "@myth/ui";

const SearchBox = ({ refine }: any) => {
  return (
    <UI.Flex align="stretch" pos="relative">
      <UI.Input
        type="search"
        placeholder="Buscar..."
        onChange={(event) => refine(event.currentTarget.value)}
        h={68}
        pl={68}
        border={0}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        _focusVisible={{
          boxShadow: "none",
        }}
      />
      <UI.Flex
        pos="absolute"
        h={68}
        align="center"
        justify="center"
        left={7}
        zIndex={2}
      >
        <UI.Box as={CIcon} icon={icons.riSearchLine} size="lg" />
      </UI.Flex>
    </UI.Flex>
  );
};

export default connectSearchBox(SearchBox);
