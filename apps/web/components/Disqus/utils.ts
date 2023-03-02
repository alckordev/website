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

export {};
