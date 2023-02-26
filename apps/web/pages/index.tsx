import { UI } from "@myth/ui";
import { Layout, PostListItem } from "../components";

export default function Web() {
  return (
    <Layout metadata={{ title: "My Web" }}>
      <UI.Flex
        direction={["column", "column", "row", "row"]}
        flexWrap="wrap"
        mx="-4"
      >
        <UI.Box
          flexGrow={0}
          flexShrink={0}
          flexBasis={["100%", "100%", "30%", "30%"]}
          px={4}
          border="1px solid pink"
        >
          Left aside
        </UI.Box>
        <UI.Box
          flexGrow={0}
          flexShrink={0}
          flexBasis={["100%", "100%", "70%", "70%"]}
          px={4}
        >
          <UI.VStack spacing={4}>
            {[1, 2, 3, 4, 5].map((x) => (
              <PostListItem key={x} />
            ))}
          </UI.VStack>
        </UI.Box>
      </UI.Flex>
    </Layout>
  );
}
