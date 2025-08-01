import useSyncSession from "@/hooks/use-sync-session";
import { formatCompactNumber } from "@/lib/client";
import firebase from "@/lib/client/firebase";
import { Button, useMantineTheme } from "@mantine/core";
import { RiHeartFill, RiHeartLine } from "@remixicon/react";
import * as db from "firebase/database";
import { useEffect, useState } from "react";

export const ThreadLikeToggle = ({
  thread,
  locale,
}: {
  thread: string;
  locale: string;
}) => {
  const theme = useMantineTheme();

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const { user } = useSyncSession();

  // check if current user already liked this thread
  useEffect(() => {
    if (!user) {
      setLiked(false);
      return;
    }

    const ref = db.ref(
      firebase.database(),
      `users/${user.uid}/threads/likes/${thread}`
    );

    const callback = (snapshot: db.DataSnapshot) => {
      setLiked(!!snapshot.val());
    };

    db.onValue(ref, callback);

    return () => {
      db.off(ref, "value", callback);
    };
  }, [thread, user]);

  useEffect(() => {
    const ref = db.ref(firebase.database(), `threads/${thread}`);

    const callback = (snapshot: db.DataSnapshot) => {
      const val = snapshot.val();
      if (val && typeof val.likes === "number") {
        setLikes(val.likes);
      } else {
        setLikes(0);
      }
    };

    db.onValue(ref, callback);

    return () => db.off(ref, "value", callback);
  }, [thread]);

  const handleToggle = async () => {
    if (!user) {
      console.log("login");
      return;
    }

    const threadRef = db.ref(firebase.database(), `threads/${thread}`);
    const threadSnap = await db.get(threadRef);

    if (!threadSnap.exists()) return;

    const userLikeRef = db.ref(
      firebase.database(),
      `users/${user.uid}/threads/likes/${thread}`
    );

    if (!liked) {
      const currentLikes = threadSnap.val().likes;
      const newLikes = currentLikes + 1;
      await db.update(threadRef, { likes: newLikes });
      await db.set(userLikeRef, true);
      setLiked(true);
    } else {
      const currentLikes = threadSnap.val().likes;
      const newLikes = currentLikes - 1;
      await db.update(threadRef, { likes: newLikes });
      await db.remove(userLikeRef);
      setLiked(false);
    }
  };

  return (
    <Button
      variant="transparent"
      c="white"
      size="compact-md"
      px={0}
      leftSection={
        liked ? (
          <RiHeartFill color={theme.colors.red[5]} size={20} />
        ) : (
          <RiHeartLine size={20} />
        )
      }
      onClick={handleToggle}
    >
      {formatCompactNumber(likes, locale)}
    </Button>
  );
};
