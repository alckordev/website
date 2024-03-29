import { useCallback, useContext, useEffect, useState } from "react";
import { UI, useColorModeValue } from "@myth/ui";
import { DisqusPost } from "./DisqusPost";
import { SlateEditor } from "../SlateEditor";
import * as fbdb from "firebase/database";
import { database } from "../../lib/firebase";
import { getWithKey, sortTreeNodes } from "../../lib/firebase-utils";
import { orderByDate } from "../../lib/order-by-date";
import { AuthContext } from "../../store/AuthContextProvider";

const postRef = fbdb.ref(database, "posts");

export const Disqus = ({ shortname, identifier, ...rest }: any) => {
  const { currentUser, onOpenSignIn } = useContext(AuthContext);

  const [posts, setPosts] = useState<any[]>([]);

  const loadInstance = useCallback(async (thread: string) => {
    const endpoint = fbdb.query(
      postRef,
      fbdb.orderByChild("thread"),
      fbdb.equalTo(thread)
    );

    const snapshot = await fbdb.get(endpoint);

    if (!snapshot.exists()) return;

    const allPosts = getWithKey(snapshot.val()).sort(orderByDate);

    setPosts(allPosts);
  }, []);

  useEffect(() => {
    // Load instance
    loadInstance(identifier);

    // Watching new posts
    const endpoint = fbdb.query(
      postRef,
      fbdb.orderByChild("thread"),
      fbdb.equalTo(identifier)
    );

    fbdb.onChildAdded(endpoint, (snapshot) => {
      const newPost = { ...snapshot.val(), key: snapshot.key };
      const existingPost = posts.find((post) => post.key === newPost.key);

      if (existingPost) return;

      setPosts((prevPosts) => [newPost, ...prevPosts]);
    });

    return () => {
      // Stop watching when component is unmounted
      fbdb.off(endpoint, "child_added");
    };
  }, [identifier]);

  return (
    <UI.Box minW="100%" mb={4} {...rest}>
      <SlateEditor
        user={currentUser}
        thread={identifier}
        onOpenSignIn={onOpenSignIn}
      />
      <UI.Divider
        my={8}
        borderColor={useColorModeValue("gray.200", "gray.928")}
        opacity={1}
      />
      <UI.VStack
        divider={
          <UI.StackDivider
            borderColor={useColorModeValue("gray.200", "gray.928")}
          />
        }
        spacing={4}
      >
        {sortTreeNodes(posts).map((post: any) => (
          <DisqusPost
            key={post.key}
            user={currentUser}
            post={post}
            thread={identifier}
            onOpenSignIn={onOpenSignIn}
          />
        ))}
      </UI.VStack>
    </UI.Box>
  );
};
