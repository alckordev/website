import { Fragment, useEffect, useState } from "react";
import { UI } from "@myth/ui";
import { CommentForm } from "./CommentForm";
import { ref, query, orderByChild, equalTo, get } from "firebase/database";
import { database } from "../../lib/firebase";
import { transform, transformFirstOrDefault } from "./utils";

const threadRef = ref(database, "threads");
const postRef = ref(database, "posts");

export const PostComments = ({ shortname, config, ...rest }: any) => {
  const [thread, setThread] = useState<string>("");

  const [posts, setPosts] = useState<any[]>([]);

  const onUpdateThread = (thread: string) => {
    console.log("parent onUpdateThread", thread);
    setThread(thread);
  };

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

    setPosts(postsSnapshot);
  };

  useEffect(() => {
    loadInstance();
  }, [config.identifier]);

  return (
    <UI.Box role="thread" minW="100%" {...rest}>
      <Fragment>
        <UI.Box>Identifier: {thread}</UI.Box>
        <UI.Divider my={4} />
        <CommentForm
          config={config}
          thread={thread}
          onUpdateThread={onUpdateThread}
          onUpdatePosts={onUpdatePosts}
        />
        <UI.Divider my={4} />
        <UI.Box as="pre">{JSON.stringify(posts, null, 2)}</UI.Box>
      </Fragment>
    </UI.Box>
  );
};