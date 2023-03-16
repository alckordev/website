import React, { useCallback, useState } from "react";
import { UI, icon, useToast } from "@myth/ui";
import isHotkey from "is-hotkey";
import { Editable, withReact, Slate, ReactEditor } from "slate-react";
import { createEditor, BaseEditor } from "slate";
import { MarkButton, toggleMark } from "./MarkButton";
import { Leaf } from "./Leaf";
import { CustomElement, CustomText } from "./types";
import { HOTKEYS } from "./constants";

import { useController, useForm } from "react-hook-form";
import { serialize } from "./serialize";
import { formatISO } from "date-fns";
import { ref, set, get, push } from "firebase/database";
import { database } from "../../lib/firebase";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const SlateEditor = ({
  user: currentUser,
  thread,
  parent = null,
  placeholder = "Únete a la conversación…",
  onCancel,
  onOpenSignIn,
}: {
  user: any;
  thread: string;
  parent: string | null;
  placeholder?: string;
  onCancel?: () => void;
  onOpenSignIn: () => void;
}) => {
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  const [editor] = useState(() => withReact(createEditor()));

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
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

  const toast = useToast({ position: "top" });

  const addPost = async (data: {
    message: string;
    thread: string;
    parent: string | null;
  }) => {
    const postRef = push(ref(database, "posts"));

    await set(postRef, {
      thread: data.thread,
      author: {
        uid: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        emailVerified: currentUser.emailVerified,
        picture: currentUser.photoURL,
        isAnonymous: currentUser.isAnonymous,
      },
      message: data.message,
      likes: 0,
      dislikes: 0,
      numReports: 0,
      isSpam: false,
      isApproved: true,
      parent: data.parent,
      createdAt: formatISO(new Date()),
      updatedAt: null,
    });

    const snapshot = await get(postRef);

    console.log(snapshot.val());

    return { ...snapshot.val(), key: snapshot.key };
  };

  const onSubmit = handleSubmit(async ({ message }) => {
    if (!currentUser) {
      onOpenSignIn();
      return;
    }

    try {
      const html = message
        .map((node: CustomElement) => serialize(node))
        .join("");

      await addPost({ message: html, thread, parent });

      // reset({
      //   message: [
      //     {
      //       type: "paragraph",
      //       children: [{ text: "" }],
      //     },
      //   ],
      // });

      if (parent && typeof onCancel === "function") onCancel();
    } catch (err) {
      console.log("err", err);
      toast({
        description: "¡Ups! Algo salió mal. 😭",
        status: "error",
        isClosable: true,
      });
    }
  });

  console.log("parent", parent);

  return (
    <UI.Box as="form" onSubmit={onSubmit} boxShadow="md" p={4}>
      <Slate editor={editor} value={value} onChange={onChange}>
        {!parent && (
          <UI.HStack spacing={4}>
            <UI.Avatar
              name={currentUser?.displayName}
              src={currentUser?.photoURL}
              size="sm"
            />
            <UI.Text>{currentUser?.displayName}</UI.Text>
          </UI.HStack>
        )}

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
            {onCancel && typeof onCancel === "function" && (
              <UI.Button variant="ghost" rounded="3xl" onClick={onCancel}>
                Cancelar
              </UI.Button>
            )}

            <UI.Button
              type="submit"
              colorScheme="purple"
              rounded="3xl"
              isDisabled={errors.message ? true : false}
              isLoading={isSubmitting}
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
