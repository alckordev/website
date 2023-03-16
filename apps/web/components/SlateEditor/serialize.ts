import { Text, Element } from "slate";
import { CustomElement, CustomText } from "./Types";

export function serialize(node: CustomElement | CustomText): any {
  if (Text.isText(node)) {
    let text = node.text;

    if (node.bold) text = `<strong>${text}</strong>`;

    if (node.italic) text = `<em>${text}</em>`;

    if (node.underline) text = `<u>${text}</u>`;

    return text;
  }

  if (Element.isElement(node)) {
    const children = node.children.map((child) => serialize(child)).join("");

    if (children === "") return null;

    switch (node.type) {
      case "heading":
        return `<h${node.level}>${children}</h${node.level}>`;
      case "paragraph":
        return `<p>${children}</p>`;
      case "link":
        return `<a href="${node.url}">${children}</a>`;
      default:
        return children;
    }
  }

  return null;
}
