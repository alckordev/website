import { useCallback, useContext, useEffect, useState } from "react";
import { UI, CIcon, icons } from "@myth/ui";
import * as fbdb from "firebase/database";
import { database } from "../../lib/firebase";
import { displayNumber } from "../../lib/format-number";
import { AuthContext } from "../../store/AuthContextProvider";

export const DisqusThreadLikes = ({ identifier }: { identifier: string }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const { currentUser, onOpenSignIn } = useContext(AuthContext);

  const loadInstance = useCallback(
    async (thread: string) => {
      // Check if user liked thread
      if (currentUser) {
        const userLikedThreadRef = fbdb.ref(
          database,
          `users/${currentUser.uid}/threads/likes/${thread}`
        );

        fbdb.onValue(userLikedThreadRef, (snapshot: fbdb.DataSnapshot) => {
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
    const threadRef = fbdb.ref(database, `threads/${identifier}`);

    fbdb.onValue(threadRef, (snapshot) => {
      if (snapshot.exists()) {
        const thread = snapshot.val();
        const currentLikesCount = thread.likes;

        setLikes(currentLikesCount);
      }
    });
  }, [identifier, liked]);

  const handleLike = async () => {
    if (!currentUser) {
      onOpenSignIn();
      return;
    }

    const threadRef = fbdb.ref(database, `threads/${identifier}`);
    const threadSnapshot = await fbdb.get(threadRef);

    if (!threadSnapshot.exists()) {
      return;
    }

    const userLikedThreadRef = fbdb.ref(
      database,
      `users/${currentUser.uid}/threads/likes/${identifier}`
    );

    if (!liked) {
      const currentLikes = threadSnapshot.val().likes;
      const newLikes = currentLikes + 1;
      await fbdb.update(threadRef, { likes: newLikes });
      await fbdb.set(userLikedThreadRef, true);
      setLiked(true);
    } else {
      const currentLikes = threadSnapshot.val().likes;
      const newLikes = currentLikes - 1;
      await fbdb.update(threadRef, { likes: newLikes });
      await fbdb.remove(userLikedThreadRef);
      setLiked(false);
    }
  };

  return (
    <UI.Button
      leftIcon={<CIcon icon={liked ? icons.riLikeFill : icons.riLikeLine} />}
      size="sm"
      variant="link"
      onClick={handleLike}
      _hover={{ textDecor: "none" }}
    >
      {displayNumber(likes | 0)}
    </UI.Button>
  );
};
