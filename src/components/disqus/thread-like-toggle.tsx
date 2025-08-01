import useSyncSession from "@/hooks/use-sync-session";
import { formatCompactNumber } from "@/lib/client";
import firebase from "@/lib/client/firebase";
import { Button, Skeleton, useMantineTheme } from "@mantine/core";
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

  const [isPending, setPending] = useState(false);
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean | null>(null);

  const { user, initializing } = useSyncSession();

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

  // check if current user already liked this thread
  useEffect(() => {
    if (initializing) return;
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
  }, [thread, user, initializing]);

  const handleToggle = async () => {
    try {
      setPending(true);

      const res = await fetch(`/api/threads/${thread}/like`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();

      setLiked(data.liked);
      setLikes(data.likes);
    } catch (err) {
      console.error("toggle like failed", err);
    } finally {
      setPending(false);
    }
  };

  if (likes === null || liked === null || initializing) {
    return <Skeleton width={80} height={32} radius="sm" animate={true} />;
  }

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
      loading={isPending}
      loaderProps={{
        type: "dots",
      }}
    >
      {formatCompactNumber(likes, locale)}
    </Button>
  );
};
