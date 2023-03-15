import React, { useCallback, useMemo } from "react";
import { UI, icon } from "@myth/ui";
import isHotkey from "is-hotkey";
import { Editable, withReact, Slate, ReactEditor } from "slate-react";
import { createEditor, Descendant, BaseEditor } from "slate";
import { MarkButton, toggleMark } from "./MarkButton";
import { Leaf } from "./Leaf";
import { CustomElement, CustomText } from "./Types";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const HOTKEYS: Record<string, string> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const SlateEditor = ({
  value,
  onChange,
  placeholder = "Enter some rich text…",
}: {
  value: Descendant[];
  onChange: () => void;
  placeholder?: string;
}) => {
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <UI.Box boxShadow="md" p={4}>
      <Slate editor={editor} value={initialValue}>
        <UI.Box my={4} minH={100}>
          <Editable
            renderLeaf={renderLeaf}
            placeholder={placeholder}
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
          />
        </UI.Box>
        <UI.HStack justify="space-between">
          <UI.ButtonGroup size="sm">
            <MarkButton format="bold" icon={icon.riBold} />
            <MarkButton format="italic" icon={icon.riItalic} />
            <MarkButton format="underline" icon={icon.riUnderline} />
          </UI.ButtonGroup>
          <UI.ButtonGroup size="sm">
            <UI.Button variant="ghost" rounded="3xl">
              Cancelar
            </UI.Button>
            <UI.Button colorScheme="purple" rounded="3xl">
              Responder
            </UI.Button>
          </UI.ButtonGroup>
        </UI.HStack>
      </Slate>
    </UI.Box>
  );
};

export { SlateEditor };
