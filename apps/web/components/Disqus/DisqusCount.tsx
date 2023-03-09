import { useEffect, useState } from "react";
import { UI } from "@myth/ui";
import {
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  onValue,
  DataSnapshot,
} from "firebase/database";
import { database } from "../../lib/firebase";
import { transformFirstOrDefault } from "./utils";

const threadRef = ref(database, "threads");
const postRef = ref(database, "posts");

export const DisqusCount = ({
  identifier,
  onlyNumber = false,
  ...rest
}: {
  identifier: string;
  onlyNumber?: boolean;
}) => {
  const [count, setCount] = useState(0);

  const findThreadByIdentifier = async (identifier: string) => {
    const endpoint = query(
      threadRef,
      orderByChild("identifier"),
      equalTo(identifier)
    );
    const snapshot = await get(endpoint);

    if (snapshot.exists()) {
      return transformFirstOrDefault(snapshot.val());
    }

    return undefined;
  };

  const loadInstance = async () => {
    const threadSnapshot = await findThreadByIdentifier(identifier);

    if (!threadSnapshot) return;

    const postEndpoint = query(
      postRef,
      orderByChild("thread"),
      equalTo(threadSnapshot.key)
    );

    const postCountRef = ref(database, `postCounts/${threadSnapshot.key}`);

    const updateCount = (snapshot: DataSnapshot) => {
      setCount(snapshot.size);
    };

    onValue(postEndpoint, updateCount);
    onValue(postCountRef, updateCount);
  };

  useEffect(() => {
    loadInstance();
  }, [identifier]);

  return (
    <UI.Text as="span" {...rest}>
      {count} {!onlyNumber && (count === 1 ? "comentario" : "comentarios")}
    </UI.Text>
  );
};
