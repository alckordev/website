import { NextApiRequest, NextApiResponse } from "next";
import { format, parseISO } from "date-fns";
import algoliasearch, { SearchIndex } from "algoliasearch";
import { getFilesFrontmatter } from "../../lib/mdx";

const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;

if (!ALGOLIA_APP_ID || !ALGOLIA_API_KEY) {
  throw new Error(
    "Algolia App ID and API Key must be defined in environment variables."
  );
}

const algolia = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

const index: SearchIndex = algolia.initIndex("alckordev");

async function updatedPostsInAgolia(posts: any) {
  const agoliaObjects = posts.map((post: any) => ({
    objectID: `${format(parseISO(post.createdAt), "yyyyMMdd'T'HHmmss")}-${
      post.slug
    }`,
    title: post.title,
    slug: post.slug,
    publishedAt: post.createdAt,
    views: 0,
  }));

  try {
    const response = await index.saveObjects(agoliaObjects);
    return response;
  } catch (error) {
    throw error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const allPosts = await getFilesFrontmatter({ type: "posts" });

    const response = await updatedPostsInAgolia(allPosts);

    res.status(200).json({ status: 200, ...response });
  } catch (error) {
    res.status(500).json(error);
  }
}
