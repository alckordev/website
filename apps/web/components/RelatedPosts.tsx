import { UI, useColorModeValue } from "@myth/ui";
import { PostListItem } from "./PostListItem";
import { _date } from "../lib/format-date";

export const RelatedPosts = ({ relateds }: { relateds: any[] }) => {
  if (!relateds.length) return null;

  return (
    <UI.VStack
      divider={
        <UI.StackDivider
          borderColor={useColorModeValue("gray.200", "gray.800")}
        />
      }
      bg={useColorModeValue("gray.100", "gray.700")}
      spacing={7}
      p="24px"
    >
      {relateds.map((post: any) => (
        <PostListItem
          key={post.slug}
          title={post.title}
          summary={post.summary}
          customDate={_date(post.createdAt)}
          dateTime={post.createdAt}
          slug={post.slug}
          tags={post.tags}
        />
      ))}
    </UI.VStack>
  );
};
