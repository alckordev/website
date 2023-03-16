import React, { useCallback, useState } from "react";
import { UI, icon } from "@myth/ui";
import isHotkey from "is-hotkey";
import { Editable, withReact, Slate, ReactEditor } from "slate-react";
import { createEditor, BaseEditor } from "slate";
import { MarkButton, toggleMark } from "./MarkButton";
import { Leaf } from "./Leaf";
import { CustomElement, CustomText } from "./Types";
import { HOTKEYS } from "./constants";

import { useController, useForm } from "react-hook-form";
import { serialize } from "./serialize";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const SlateEditor = ({
  placeholder = "Únete a la conversación…",
}: {
  placeholder?: string;
}) => {
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  const [editor] = useState(() => withReact(createEditor()));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    field: { onChange, value },
  } = useController({
    name: "message",
    control,
    defaultValue: [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ],
    rules: {
      validate: (nodes) => {
        const value = nodes
          .map((node: CustomElement) => serialize(node))
          .join("");
        return value !== "";
      },
    },
  });

  const onSubmit = handleSubmit(async ({ message }) => {
    const html = message.map((node: CustomElement) => serialize(node)).join("");

    console.log("html", html);
  });

  return (
    <UI.Box as="form" onSubmit={onSubmit} boxShadow="md" p={4}>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
      <Slate editor={editor} value={value} onChange={onChange}>
        <UI.Box minH={100}>
          <UI.Box py={4}>
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
              onFocus={(event) => {
                event.preventDefault();
                console.log("FOCUS");
              }}
            />
          </UI.Box>
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
            <UI.Button
              type="submit"
              colorScheme="purple"
              rounded="3xl"
              isDisabled={errors.message ? true : false}
            >
              Responder
            </UI.Button>
          </UI.ButtonGroup>
        </UI.HStack>
      </Slate>
    </UI.Box>
  );
};

export { SlateEditor };
