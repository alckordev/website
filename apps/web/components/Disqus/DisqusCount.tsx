import { useCallback, useEffect, useState } from "react";
import { UI } from "@myth/ui";
import * as fbdb from "firebase/database";
import { database } from "../../lib/firebase";
import { displayNumber } from "../../lib/format-number";

export const DisqusCount = ({
  identifier,
  onlyNumber = false,
  ...rest
}: {
  identifier: string;
  onlyNumber?: boolean;
}) => {
  const [count, setCount] = useState(0);

  const loadInstance = useCallback(async (thread: string) => {
    const postRef = fbdb.ref(database, "posts");

    const postsByThread = fbdb.query(
      postRef,
      fbdb.orderByChild("thread"),
      fbdb.equalTo(thread)
    );

    const postCountRef = fbdb.ref(database, `postCounts/${thread}`);

    const updateCount = (snapshot: fbdb.DataSnapshot) => {
      setCount(snapshot.size);
    };

    fbdb.onValue(postsByThread, updateCount);
    fbdb.onValue(postCountRef, updateCount);
  }, []);

  useEffect(() => {
    // Load instance
    loadInstance(identifier);
  }, [identifier]);

  return (
    <UI.Text as="span" {...rest}>
      {displayNumber(count)}{" "}
      {!onlyNumber && (count === 1 ? "comentario" : "comentarios")}
    </UI.Text>
  );
};
