import { useEffect, useState } from "react";
import { UI } from "@myth/ui";
import {
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
  DataSnapshot,
} from "firebase/database";
import { database } from "../../lib/firebase";

export const DisqusCount = ({
  identifier,
  onlyNumber = false,
  ...rest
}: {
  identifier: string;
  onlyNumber?: boolean;
}) => {
  const [count, setCount] = useState(0);

  const loadInstance = async () => {
    const postRef = ref(database, "posts");

    const postsByThread = query(
      postRef,
      orderByChild("thread"),
      equalTo(identifier)
    );

    const postCountRef = ref(database, `postCounts/${identifier}`);

    const updateCount = (snapshot: DataSnapshot) => {
      setCount(snapshot.size);
    };

    onValue(postsByThread, updateCount);
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
