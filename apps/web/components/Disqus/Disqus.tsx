import { useContext, useEffect, useState } from "react";
import { UI, useColorModeValue } from "@myth/ui";
import { DisqusForm } from "./DisqusForm";
// import { DisqusEditor } from "./DisqusEditor";
import { DisqusPost } from "./DisqusPost";
import { ref, query, orderByChild, equalTo, get } from "firebase/database";
import { database } from "../../lib/firebase";
import { transform, sortTreeNodes } from "./utils";
import { AuthContext } from "../../store/AuthProvider";

export const Disqus = ({ shortname, identifier, config, ...rest }: any) => {
  const currentUser = useContext(AuthContext);

  // const [thread, setThread] = useState<string>("");
  const [posts, setPosts] = useState<any[]>([]);

  // const onUpdateThread = (thread: string) => setThread(thread);

  const onUpdatePosts = (post: any) => setPosts([post, ...posts]);

  const findPostsByThread = async (thread: string) => {
    const postRef = ref(database, "posts");

    const endpoint = query(postRef, orderByChild("thread"), equalTo(thread));

    const snapshot = await get(endpoint);

    if (snapshot.exists()) {
      return transform(snapshot.val());
    }

    return undefined;
  };

  const loadInstance = async () => {
    const postsSnapshot = await findPostsByThread(identifier);

    if (!postsSnapshot) return;

    setPosts(postsSnapshot.reverse());
  };

  useEffect(() => {
    loadInstance();
  }, [identifier]);

  return (
    <UI.Box minW="100%" mb={4} {...rest}>
      <DisqusForm
        user={currentUser}
        thread={identifier}
        onUpdatePosts={onUpdatePosts}
      />
      <UI.Divider
        my={8}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        opacity={1}
      />
      <UI.VStack
        divider={
          <UI.StackDivider
            borderColor={useColorModeValue("gray.200", "gray.900")}
          />
        }
        spacing={4}
      >
        {sortTreeNodes(posts).map((post: any) => (
          <DisqusPost
            key={post.key}
            user={currentUser}
            post={post}
            replyConfig={{
              thread: identifier,
              onUpdatePosts,
            }}
          />
        ))}
      </UI.VStack>
    </UI.Box>
  );
};
