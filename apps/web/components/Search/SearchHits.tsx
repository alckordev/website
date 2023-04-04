import { connectStateResults } from "react-instantsearch-dom";
import NextLink from "next/link";
import { UI, CIcon, icons, useColorMode, useColorModeValue } from "@myth/ui";
import { Fragment } from "react";
import { _date } from "../../lib/format-date";

const SearchHits = ({ searchState, searchResults }: any) => {
  // checking if the query length is >= 1
  // (since 1 is the minimum Algolia query length)
  const validQuery = searchState.query?.length >= 1;

  const { colorMode } = useColorMode();

  const backgroundColor = useColorModeValue("gray.300", "gray.900");
  const color = useColorModeValue("blackAlpha.500", "whiteAlpha.500");

  return searchState.query && validQuery && searchResults?.hits.length > 0 ? (
    <Fragment>
      <UI.Box
        mx={4}
        py={4}
        maxH="66vh"
        overflow="hidden"
        borderTopWidth={1}
        borderBottomWidth={1}
      >
        {searchResults.hits.map((hit: any) => (
          <NextLink key={hit.objectID} href={`/${hit.slug}`}>
            <UI.Flex
              gap={4}
              align="center"
              px={4}
              py={2}
              rounded="md"
              _hover={{
                backgroundColor,
                textDecor: "none",
              }}
            >
              <UI.Box
                as={CIcon}
                icon={icons.riArticleLine}
                size="lg"
                color={color}
              />
              <UI.Box lineHeight={1.25}>
                <UI.Text
                  dangerouslySetInnerHTML={{
                    __html: hit._highlightResult.title.value,
                  }}
                  fontWeight="medium"
                />
                <UI.Text
                  as="time"
                  fontSize="xs"
                  color={color}
                  dateTime={hit.publishedAt}
                >
                  {_date(hit.publishedAt)}
                </UI.Text>
              </UI.Box>
            </UI.Flex>
          </NextLink>
        ))}
      </UI.Box>
      <UI.Flex gap={2} opacity={0.5} p={4} justify="end">
        <UI.Text as="span" fontSize="sm">
          Search by
        </UI.Text>
        <UI.Image
          src={
            colorMode === "dark"
              ? "assets/agolia-dark.png"
              : "assets/agolia-light.png"
          }
          width="auto"
          height="20px"
          alt="Agolia"
        />
      </UI.Flex>
    </Fragment>
  ) : null;
};

export default connectStateResults(SearchHits);
