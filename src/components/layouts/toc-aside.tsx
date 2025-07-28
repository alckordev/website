import { Divider, Stack } from "@mantine/core";
import { TopicList } from "../topic-list";
import { Newsletter } from "../newsletter";
import { Toc } from "@/type";

import { MDXContents } from "../mdx/mdx-contents";

export const TocAside = ({ toc }: { toc?: Toc }) => {
  return (
    <Stack
      component="aside"
      role="navigation"
      display={{ base: "none", lg: "flex" }}
      miw={380}
      maw={380}
      mih="100%"
      mx="auto"
      py={50}
      ps={{ base: "md", lg: "xl" }}
      pe="md"
      gap="xl"
      style={{
        borderLeft: "1px solid var(--mantine-accent-surface)",
      }}
    >
      <Stack gap="xl" pos="sticky" top={120}>
        <MDXContents toc={toc} />
        {toc && <Divider />}
        <TopicList />
        <Divider />
        <Newsletter />
      </Stack>
    </Stack>
  );
};
