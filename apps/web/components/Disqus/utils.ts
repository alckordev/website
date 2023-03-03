// import React from "react";

// export function shallowComparison(currentProps: any, nextProps: any) {
//   // Perform a comparison of all props, excluding React Elements, to prevent unnecessary updates
//   const propNames = new Set(Object.keys(currentProps), Object.keys(nextProps)); // eslint-disable-line no-undef
//   for (const name of propNames) {
//     if (typeof currentProps[name] === "object") {
//       if (shallowComparison(currentProps[name], nextProps[name])) return true;
//     } else if (
//       currentProps[name] !== nextProps[name] &&
//       !isReactElement(currentProps[name])
//     ) {
//       return true;
//     }
//   }
//   return false;
// }

interface TreeNode {
  id: string;
  createdAt: string;
  parent?: number;
  children?: TreeNode[];
}

export function sortTreeNodes(nodes: TreeNode[]): TreeNode[] {
  const map = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  // Create a mapping of id to node
  nodes.forEach((node) => {
    map.set(node.id, node);
  });

  // Find the root nodes and add them to the roots array
  nodes.forEach((node) => {
    if (!node.parent) {
      roots.push(node);
    }
  });

  // Recursively traverse the tree and add child nodes to their parent's children array
  function traverse(node: TreeNode) {
    const children: TreeNode[] = [];

    nodes.forEach((childNode) => {
      if (childNode.parent === parseInt(node.id)) {
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
  function sortChildren(node: TreeNode) {
    if (node.children) {
      node.children.sort(
        (a, b) =>
          new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
      );

      node.children.forEach((child) => {
        sortChildren(child);
      });
    }
  }

  // Flatten the tree into a list of nodes
  const sortedNodes: TreeNode[] = [];

  roots.forEach((root) => {
    sortedNodes.push({ ...root, children: traverse(root).children });
  });

  return sortedNodes;
}
