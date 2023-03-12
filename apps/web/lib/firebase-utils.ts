import { formatISO } from "date-fns";
import {
  ref,
  query,
  orderByChild,
  equalTo,
  set,
  get,
  push,
} from "firebase/database";
import { database } from "./firebase";

export function getWithKey(data: any, isFirstOrDefault?: boolean) {
  const array = Object.keys(data).map((key) => {
    return {
      ...data[key],
      key,
    };
  });

  return isFirstOrDefault ? array[0] : array;
}

export function firstOrDefault(data: any) {
  const array = Object.keys(data).map((key) => {
    return {
      ...data[key],
      key,
    };
  });

  return array[0];
}

export async function setThread({
  title,
  identifier,
  url,
}: {
  title: string;
  identifier: string;
  url: string;
}) {
  const threadRef = push(ref(database, "threads"));

  await set(threadRef, {
    link: url,
    identifier: identifier,
    title: title,
    likes: 0,
    dislikes: 0,
    posts: 0,
    createdAt: formatISO(new Date()),
    updatedAt: null,
  });

  const snapshot = await get(threadRef);

  const thread = snapshot.val();

  return { ...thread, key: snapshot.key };
}

export async function getThread({
  title,
  identifier,
  url,
}: {
  title: string;
  identifier: string;
  url: string;
}) {
  const threadRef = ref(database, "threads");

  const endpoint = query(
    threadRef,
    orderByChild("identifier"),
    equalTo(identifier)
  );

  const snapshot = await get(endpoint);

  if (snapshot.exists()) {
    return firstOrDefault(snapshot.val());
  }

  // Create thread for this ${identifier}
  return setThread({ title, identifier, url });
}
