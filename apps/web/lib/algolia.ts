import algoliasearch from "algoliasearch/lite";

const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;

if (!ALGOLIA_APP_ID || !ALGOLIA_API_KEY) {
  throw new Error(
    "Algolia App ID and API Key must be defined in environment variables."
  );
}

const algolia = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

export { algolia };
