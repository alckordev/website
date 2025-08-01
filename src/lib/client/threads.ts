import * as db from "firebase/database";
import firebase from "../client/firebase";
import { Thread } from "@/type";

export const setThread = async ({ identifier }: Thread): Promise<Thread> => {
  const ref = db.push(db.ref(firebase.database(), "threads"));

  await db.set(ref, {
    identifier: identifier,
    likes: 0,
    dislikes: 0,
    responses: 0,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  });

  const snapshot = await db.get(ref);

  const thread = snapshot.val();

  return { ...thread, uid: snapshot.key };
};

export const getThread = async ({ identifier }: Thread): Promise<Thread> => {
  const ref = db.ref(firebase.database(), "threads");

  const query = db.query(
    ref,
    db.orderByChild("identifier"),
    db.equalTo(identifier)
  );

  const snapshot = await db.get(query);

  if (snapshot.exists()) {
    const values = snapshot.val();
    return Object.keys(values).map((k) => ({ ...values[k], uid: k }))[0];
  }

  return setThread({ identifier });
};
