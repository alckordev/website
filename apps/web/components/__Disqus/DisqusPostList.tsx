import { UI } from "@myth/ui";
import { DisqusPost } from "./DisqusPost";

export const DisqusPostList = ({ posts = [], ...rest }: any) => {
  return (
    <UI.VStack role="post-list" {...rest}>
      {posts.map((node: any) => (
        <DisqusPost key={node.id} node={node} />
      ))}
    </UI.VStack>
  );
};
