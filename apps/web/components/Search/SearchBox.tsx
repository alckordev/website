import { useState, ChangeEvent, Fragment } from "react";
import { UI, CIcon, icons } from "@myth/ui";
import { useInstantSearch, useSearchBox } from "react-instantsearch-hooks";
import { Hits } from "./Hits";

export const SearchBox = () => {
  const { setIndexUiState, results } = useInstantSearch();
  const y = useInstantSearch();
  const x = useSearchBox();

  console.log(y);
  console.log(x);

  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    setIndexUiState((prevIndexUiState) => {
      return {
        ...prevIndexUiState,
        query: event.target.value,
      };
    });
  };

  return (
    <Fragment>
      <UI.Flex align="stretch" pos="relative">
        <UI.Input
          type="search"
          name="search"
          value={value}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          // aria-autocomplete="list"
          onChange={handleChange}
          w="100%"
          h={68}
          pl={68}
          border={0}
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
      <Hits hits={results.hits} />
    </Fragment>
  );
};
