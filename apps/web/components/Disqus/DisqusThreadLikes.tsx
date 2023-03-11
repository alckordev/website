import { Fragment, useContext, useEffect, useState } from "react";
import { UI, CIcon, icon } from "@myth/ui";
import {
  ref,
  get,
  set,
  onValue,
  update,
  DataSnapshot,
} from "firebase/database";
import { database } from "../../lib/firebase";
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
        `users/${currentUser?.uid}/likes/${identifier}`
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

    if (liked) {
      // hay que implementar quitar el like
      console.log("Ya diste like a este hilo");
    } else {
      const threadRef = ref(database, `threads/${identifier}`);
      const threadSnapshot = await get(threadRef);

      if (threadSnapshot.exists()) {
        const currentLikes = threadSnapshot.val().likes;
        const newLikes = currentLikes + 1;

        await update(threadRef, { likes: newLikes });
      }

      const userRef = ref(
        database,
        `users/${currentUser.uid}/likes/${identifier}`
      );

      await set(userRef, true);

      setLiked(true);
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
        {likes | 0}
      </UI.Button>
      <SignInAllButtons
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
      />
    </Fragment>
  );
};
