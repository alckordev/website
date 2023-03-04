import React, { ReactElement } from "react";

function isReactElement(value: any): value is ReactElement {
  return React.isValidElement(value);
}

export function shallowComparison(
  currentProps: { [key: string]: any },
  nextProps: { [key: string]: any }
): boolean {
  const propNames = new Set([
    ...Object.keys(currentProps),
    ...Object.keys(nextProps),
  ]);

  for (const name of propNames) {
    if (typeof currentProps[name] === "object") {
      if (
        shallowComparison(
          currentProps[name] as { [key: string]: any },
          nextProps[name] as { [key: string]: any }
        )
      ) {
        return true;
      }
    } else if (
      currentProps[name] !== nextProps[name] &&
      !isReactElement(currentProps[name])
    ) {
      return true;
    }
  }

  return false;
}

export function transform(data: any) {
  const newData = Object.keys(data).map((key) => {
    return {
      ...data[key],
      key,
    };
  });
  return newData;
}

export function transformFirstOrDefault(data: any) {
  const newData = Object.keys(data).map((key) => {
    return {
      ...data[key],
      key,
    };
  });
  return newData[0];
}
