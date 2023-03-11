import { orderByDate } from "../../lib/order-by-date";

export function transform(data: any) {
  const newData = Object.keys(data).map((key) => {
    return {
      ...data[key],
      key,
    };
  });
  return newData;
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
