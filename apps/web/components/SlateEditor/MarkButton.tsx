import { CIcon, UI } from "@myth/ui";
import { useSlate } from "slate-react";
import { Editor } from "slate";

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor) as Record<string, boolean>;

  return marks ? marks[format] === true : false;
};

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const MarkButton = ({ format, icon }: { format: string; icon: string[] }) => {
  const editor = useSlate();

  return (
    <UI.IconButton
      isActive={isMarkActive(editor, format)}
      aria-label={format}
      icon={<CIcon icon={icon} />}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    />
  );
};

export { MarkButton, toggleMark };
