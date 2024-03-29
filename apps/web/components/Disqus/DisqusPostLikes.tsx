import { useCallback, useContext, useEffect, useState } from "react";
import { UI, CIcon, icons } from "@myth/ui";
import * as fbdb from "firebase/database";
import { database } from "../../lib/firebase";
import { displayNumber } from "../../lib/format-number";
import { AuthContext } from "../../store/AuthContextProvider";

export const DisqusPostLikes = ({ identifier }: { identifier: string }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const { currentUser, onOpenSignIn } = useContext(AuthContext);

  const loadInstance = useCallback(
    async (thread: string) => {
      // Check if user liked post
      if (currentUser) {
        const userLikedPostRef = fbdb.ref(
          database,
          `users/${currentUser.uid}/posts/likes/${thread}`
        );

        fbdb.onValue(userLikedPostRef, (snapshot: fbdb.DataSnapshot) => {
          const liked = snapshot.val();
          setLiked(liked);
        });
      }
    },
    [currentUser]
  );

  useEffect(() => {
    // Load instance
    loadInstance(identifier);
  }, [identifier]);

  useEffect(() => {
    const postRef = fbdb.ref(database, `posts/${identifier}`);

    fbdb.onValue(postRef, (snapshot) => {
      if (snapshot.exists()) {
        const post = snapshot.val();
        const currentLikesCount = post.likes;

        setLikes(currentLikesCount);
      }
    });
  }, [identifier, liked]);

  const handleLike = async () => {
    if (!currentUser) {
      onOpenSignIn();
      return;
    }

    const postRef = fbdb.ref(database, `posts/${identifier}`);
    const postSnapshot = await fbdb.get(postRef);

    if (!postSnapshot.exists()) {
      return;
    }

    const userLikedPostRef = fbdb.ref(
      database,
      `users/${currentUser.uid}/posts/likes/${identifier}`
    );

    if (!liked) {
      const currentLikes = postSnapshot.val().likes;
      const newLikes = currentLikes + 1;
      await fbdb.update(postRef, { likes: newLikes });
      await fbdb.set(userLikedPostRef, true);
      setLiked(true);
    } else {
      const currentLikes = postSnapshot.val().likes;
      const newLikes = currentLikes - 1;
      await fbdb.update(postRef, { likes: newLikes });
      await fbdb.remove(userLikedPostRef);
      setLiked(false);
    }
  };

  return (
    <UI.Button
      leftIcon={<CIcon icon={liked ? icons.riLikeFill : icons.riLikeLine} />}
      colorScheme="purple"
      size="sm"
      variant="link"
      onClick={handleLike}
      _hover={{ textDecor: "none" }}
    >
      {displayNumber(likes | 0)}
    </UI.Button>
  );
};
