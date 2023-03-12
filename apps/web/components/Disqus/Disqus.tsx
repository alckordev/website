import { useContext, useEffect, useState } from "react";
import { UI, useColorModeValue } from "@myth/ui";
import { DisqusForm } from "./DisqusForm";
import { DisqusPost } from "./DisqusPost";
import {
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  onChildAdded,
  off,
} from "firebase/database";
import { database } from "../../lib/firebase";
import { transform, sortTreeNodes } from "./utils";
import { AuthContext } from "../../store/AuthProvider";

const postRef = ref(database, "posts");

export const Disqus = ({ shortname, identifier, ...rest }: any) => {
  const currentUser = useContext(AuthContext);

  const [posts, setPosts] = useState<any[]>([]);

  const getPostsByThread = async () => {
    const endpoint = query(
      postRef,
      orderByChild("thread"),
      equalTo(identifier)
    );

    const snapshot = await get(endpoint);

    if (snapshot.exists()) {
      return transform(snapshot.val());
    }

    return undefined;
  };

  const loadInstance = async () => {
    const postsSnapshot = await getPostsByThread();

    if (!postsSnapshot) return;

    setPosts(postsSnapshot.reverse());
  };

  useEffect(() => {
    loadInstance();

    // Watching new posts
    const endpoint = query(
      postRef,
      orderByChild("thread"),
      equalTo(identifier)
    );

    onChildAdded(endpoint, (snapshot) => {
      const newPost = { ...snapshot.val(), key: snapshot.key };
      const existingPost = posts.find((post) => post.key === newPost.key);

      if (existingPost) return;

      setPosts((prevPosts) => [newPost, ...prevPosts]);
    });

    return () => {
      // Stop watching when component is unmounted
      const endpoint = query(
        postRef,
        orderByChild("thread"),
        equalTo(identifier)
      );
      off(endpoint, "child_added");
    };
  }, [identifier]);

  return (
    <UI.Box minW="100%" mb={4} {...rest}>
      <DisqusForm user={currentUser} thread={identifier} />
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
            thread={identifier}
          />
        ))}
      </UI.VStack>
    </UI.Box>
  );
};
