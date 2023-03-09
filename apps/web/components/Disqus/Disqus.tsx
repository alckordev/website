import { Fragment, useEffect, useState } from "react";
import { UI, useColorModeValue } from "@myth/ui";
import { DisqusForm } from "./DisqusForm";
// import { DisqusEditor } from "./DisqusEditor";
import { DisqusPost } from "./DisqusPost";
import { ref, query, orderByChild, equalTo, get } from "firebase/database";
import { database } from "../../lib/firebase";
import { transform, transformFirstOrDefault, sortTreeNodes } from "./utils";

const threadRef = ref(database, "threads");
const postRef = ref(database, "posts");

export const Disqus = ({ shortname, config, ...rest }: any) => {
  const [thread, setThread] = useState<string>("");

  const [posts, setPosts] = useState<any[]>([]);

  const onUpdateThread = (thread: string) => setThread(thread);

  const onUpdatePosts = (post: any) => {
    setPosts([post, ...posts]);
  };

  const findThreadByIdentifier = async (identifier: string) => {
    const endpoint = query(
      threadRef,
      orderByChild("identifier"),
      equalTo(identifier)
    );
    const snapshot = await get(endpoint);

    if (snapshot.exists()) {
      return transformFirstOrDefault(snapshot.val());
    }

    return undefined;
  };

  const findPostsByThread = async (thread: string) => {
    const endpoint = query(postRef, orderByChild("thread"), equalTo(thread));

    const snapshot = await get(endpoint);

    if (snapshot.exists()) {
      return transform(snapshot.val());
    }

    return undefined;
  };

  const loadInstance = async () => {
    const threadSnapshot = await findThreadByIdentifier(config.identifier);

    if (!threadSnapshot) return;

    setThread(threadSnapshot.key);

    const postsSnapshot = await findPostsByThread(threadSnapshot.key);

    if (!postsSnapshot) return;

    setPosts(sortTreeNodes(postsSnapshot.reverse()));
  };

  useEffect(() => {
    loadInstance();
  }, [config.identifier]);

  return (
    <UI.Box minW="100%" mb={4} {...rest}>
      <DisqusForm
        config={config}
        thread={thread}
        onUpdateThread={onUpdateThread}
        onUpdatePosts={onUpdatePosts}
      />
      <UI.Divider my={8} />
      <UI.VStack
        divider={
          <UI.StackDivider
            borderColor={useColorModeValue("gray.200", "gray.900")}
          />
        }
        spacing={4}
      >
        {posts.map((post: any) => (
          <DisqusPost
            key={post.key}
            post={post}
            replyConfig={{
              config,
              thread,
              onUpdatePosts,
            }}
          />
        ))}
      </UI.VStack>
    </UI.Box>
  );
};
