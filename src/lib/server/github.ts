import { GitEdge, GitRepository } from "@/type";

export async function getPinnedRepos(
  login = process.env.GITHUB_LOGIN,
  limit = Number(process.env.GITHUB_LIMIT)
): Promise<GitRepository[]> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: `query GetPinnedRepos($login: String!, $limit: Int!) {
        user(login: $login) {
          pinnedItems(first: $limit, types: REPOSITORY) {
            edges {
              node {
                ... on Repository {
                  name
                  description
                  url
                  stargazerCount
                  forkCount
                  updatedAt
                }
              }
            }
          }
        }
      }`,
      variables: { login, limit },
    }),
  });

  const { data, errors } = await res.json();

  if (errors) throw new Error(errors);

  return data.user.pinnedItems.edges.map((e: GitEdge) => e.node);
}
