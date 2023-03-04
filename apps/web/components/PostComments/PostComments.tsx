import { Fragment, useEffect, useState, useMemo } from "react";
import { UI } from "@myth/ui";
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
import { database } from "../../lib/firebase";
import { CommentForm } from "./CommentForm";

interface Config {
  url: string;
  identifier: string;
  title: string;
}

interface Props {
  shortname: string;
  config: Config;
}

const threadsRef = ref(database, "threads");

export const PostComments = ({ shortname, config, ...rest }: Props) => {
  const [thread, setThread] = useState();

  const [loading, setLoading] = useState(false);

  const createThread = async () => {
    const newThreadRef = push(threadsRef);

    await set(newThreadRef, {
      link: config.url,
      identifier: config.identifier,
      title: config.title,
      likes: 0,
      dislikes: 0,
      posts: 0,
      createdAt: formatISO(new Date()),
      updatedAt: null,
    });

    const newThreadSnapshot = await get(newThreadRef);

    return newThreadSnapshot.val();
  };

  const fetchThread = async () => {
    const threadQuery = query(
      threadsRef,
      orderByChild("identifier"),
      equalTo(config.identifier)
    );
    const threadSnapshot = await get(threadQuery);

    if (threadSnapshot.exists()) {
      return threadSnapshot.val();
    }

    return createThread();
  };

  const memorizedData = useMemo(() => fetchThread(), []);

  useEffect(() => {
    async function initialize() {
      setLoading(true);

      const data = await memorizedData;

      setThread(data);
      setLoading(false);
    }

    initialize();
  }, [memorizedData]);

  return (
    <UI.Box role="thread" minW="100%">
      {!loading && thread ? (
        <Fragment>
          <UI.Box>Identifier: {config.identifier}</UI.Box>
          <UI.Divider my={4} />
          <UI.Box as="pre">{JSON.stringify(thread, null, 2)}</UI.Box>
          <UI.Divider my={4} />
          <CommentForm />
          <UI.Divider my={4} />
          <div>Post List</div>
        </Fragment>
      ) : (
        <UI.Flex gap={4} align="center" justify="center">
          <UI.Spinner />
        </UI.Flex>
      )}
    </UI.Box>
  );
};
