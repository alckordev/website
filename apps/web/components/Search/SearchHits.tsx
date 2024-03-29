import { connectStateResults } from "react-instantsearch-dom";
import { UI, CIcon, icons, useColorModeValue } from "@myth/ui";
import { Fragment } from "react";
import { _date } from "../../lib/format-date";

const SearchHits = ({ searchState, searchResults }: any) => {
  // checking if the query length is >= 1
  // (since 1 is the minimum Algolia query length)
  const validQuery = searchState.query?.length >= 1;

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
          <UI.Link
            key={hit.objectID}
            href={`/${hit.slug}`}
            display="block"
            rounded="md"
            _hover={{
              backgroundColor,
              textDecor: "none",
            }}
          >
            <UI.Flex gap={4} align="center" px={4} py={2}>
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
          </UI.Link>
        ))}
      </UI.Box>
      <UI.Flex gap={2} opacity={0.5} p={4} justify="end">
        <UI.Text as="span" fontSize="sm">
          Search by
        </UI.Text>
        <CIcon icon={icons.agolia} height={20} />
      </UI.Flex>
    </Fragment>
  ) : null;
};

export default connectStateResults(SearchHits);
