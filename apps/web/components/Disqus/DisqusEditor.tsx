import { useState } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const initialValue: Descendant[] = [
  {
    children: [{ text: "A line of text in a paragraph." }],
  },
];

export const DisqusEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable />
    </Slate>
  );
};
