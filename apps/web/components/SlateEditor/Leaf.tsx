import { HTMLProps, ReactElement } from "react";
import { CustomText } from "./types";

export const Leaf = ({
  attributes,
  children,
  leaf,
}: {
  attributes: HTMLProps<HTMLSpanElement>;
  children: ReactElement;
  leaf: CustomText;
}) => {
  if (leaf.bold) children = <strong>{children}</strong>;

  if (leaf.italic) children = <em>{children}</em>;

  if (leaf.underline) children = <u>{children}</u>;

  return <span {...attributes}>{children}</span>;
};
