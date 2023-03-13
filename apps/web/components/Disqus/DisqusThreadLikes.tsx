import { Fragment, useContext, useEffect, useState } from "react";
import { UI, CIcon, icon } from "@myth/ui";
import {
  ref,
  get,
  set,
  onValue,
  remove,
  update,
  DataSnapshot,
} from "firebase/database";
import { database } from "../../lib/firebase";
import { displayNumber } from "../../lib/format-number";
import { AuthContext } from "../../store/AuthProvider";
import { SignInAllButtons } from "../Auth";

export const DisqusThreadLikes = ({ identifier }: { identifier: string }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const currentUser = useContext(AuthContext);

  const loadInstance = async () => {
    // Check if user liked thread
    if (currentUser) {
      const userLikedThreadRef = ref(
        database,
        `users/${currentUser.uid}/threads/likes/${identifier}`
      );

      onValue(userLikedThreadRef, (snapshot: DataSnapshot) => {
        const liked = snapshot.val();
        setLiked(liked);
      });
    }
  };

  useEffect(() => {
    loadInstance();
  }, [currentUser, identifier]);

  useEffect(() => {
    const threadRef = ref(database, `threads/${identifier}`);

    onValue(threadRef, (snapshot) => {
      if (snapshot.exists()) {
        const thread = snapshot.val();
        const currentLikesCount = thread.likes;

        setLikes(currentLikesCount);
      }
    });
  }, [identifier, liked]);

  const handleLike = async () => {
    if (!currentUser) {
      setShowSignIn(true);
      return;
    }

    const threadRef = ref(database, `threads/${identifier}`);
    const threadSnapshot = await get(threadRef);

    if (!threadSnapshot.exists()) {
      return;
    }

    const userLikedThreadRef = ref(
      database,
      `users/${currentUser.uid}/threads/likes/${identifier}`
    );

    if (!liked) {
      const currentLikes = threadSnapshot.val().likes;
      const newLikes = currentLikes + 1;
      await update(threadRef, { likes: newLikes });
      await set(userLikedThreadRef, true);
      setLiked(true);
    } else {
      const currentLikes = threadSnapshot.val().likes;
      const newLikes = currentLikes - 1;
      await update(threadRef, { likes: newLikes });
      await remove(userLikedThreadRef);
      setLiked(false);
    }
  };

  return (
    <Fragment>
      <UI.Button
        leftIcon={<CIcon icon={liked ? icon.riLikeFill : icon.riLikeLine} />}
        size="sm"
        variant="link"
        onClick={handleLike}
        _hover={{ textDecor: "none" }}
      >
        {displayNumber(likes | 0)}
      </UI.Button>
      <SignInAllButtons
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
      />
    </Fragment>
  );
};
