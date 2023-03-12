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
import { orderByDate } from "./order-by-date";

export function getWithKey(data: any, options?: any) {
  const array = Object.keys(data).map((key) => {
    return {
      ...data[key],
      key,
    };
  });

  return options?.isFirstOrDefault ? array[0] : array;
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
    return getWithKey(snapshot.val(), { isFirstOrDefault: true });
  }

  // Create thread for this ${identifier}
  return setThread({ title, identifier, url });
}

export function sortTreeNodes(nodes: any[]): any[] {
  const map = new Map<string, any>();
  const roots: any[] = [];

  // Create a mapping of id to node
  nodes.forEach((node) => {
    map.set(node.key, node);
  });

  // Find the root nodes and add them to the roots array
  nodes.forEach((node) => {
    if (!node.parent) {
      roots.push(node);
    }
  });

  // Recursively traverse the tree and add child nodes to their parent's children array
  function traverse(node: any) {
    const children: any[] = [];

    nodes.forEach((childNode) => {
      if (childNode.parent === node.key) {
        children.push(traverse(childNode));
      }
    });

    node.children = children;

    return node;
  }

  // Sort the root nodes and their children recursively
  roots.forEach((root) => {
    sortChildren(root);
  });

  // Sort the children of a node and their children recursively
  function sortChildren(node: any) {
    if (node.children) {
      node.children.sort(orderByDate);
      node.children.forEach((child: any) => {
        sortChildren(child);
      });
    }
  }

  // Flatten the tree into a list of nodes
  const sortedNodes: any[] = [];

  roots.forEach((root) => {
    sortedNodes.push({ ...root, children: traverse(root).children });
  });

  return sortedNodes;
}
