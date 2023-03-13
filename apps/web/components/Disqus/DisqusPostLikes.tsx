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

export const DisqusPostLikes = ({ identifier }: { identifier: string }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const currentUser = useContext(AuthContext);

  const loadInstance = async () => {
    // Check if user liked post
    if (currentUser) {
      const userLikedPostRef = ref(
        database,
        `users/${currentUser.uid}/posts/likes/${identifier}`
      );

      onValue(userLikedPostRef, (snapshot: DataSnapshot) => {
        const liked = snapshot.val();
        setLiked(liked);
      });
    }
  };

  useEffect(() => {
    loadInstance();
  }, [currentUser, identifier]);

  useEffect(() => {
    const postRef = ref(database, `posts/${identifier}`);

    onValue(postRef, (snapshot) => {
      if (snapshot.exists()) {
        const post = snapshot.val();
        const currentLikesCount = post.likes;

        setLikes(currentLikesCount);
      }
    });
  }, [identifier, liked]);

  const handleLike = async () => {
    if (!currentUser) {
      setShowSignIn(true);
      return;
    }

    const postRef = ref(database, `posts/${identifier}`);
    const postSnapshot = await get(postRef);

    if (!postSnapshot.exists()) {
      return;
    }

    const userLikedPostRef = ref(
      database,
      `users/${currentUser.uid}/posts/likes/${identifier}`
    );

    if (!liked) {
      const currentLikes = postSnapshot.val().likes;
      const newLikes = currentLikes + 1;
      await update(postRef, { likes: newLikes });
      await set(userLikedPostRef, true);
      setLiked(true);
    } else {
      const currentLikes = postSnapshot.val().likes;
      const newLikes = currentLikes - 1;
      await update(postRef, { likes: newLikes });
      await remove(userLikedPostRef);
      setLiked(false);
    }
  };

  return (
    <Fragment>
      <UI.Button
        leftIcon={<CIcon icon={liked ? icon.riLikeFill : icon.riLikeLine} />}
        colorScheme="purple"
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
