import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import CharacterCount from "@tiptap/extension-character-count";
import BulletList from "@tiptap/extension-bullet-list";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import OrderedList from "@tiptap/extension-ordered-list";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Blockquote from "@tiptap/extension-blockquote";
import ToolBar from "./ToolBar";
import { useEffect } from "react";

interface Props {
  description: string;
  placeholder?: string;
  showToolbar?: boolean;
  onChange: (richText: string) => void;
  plainText?: boolean;
  readonly?: boolean;
  characterLimit?: number;
}

const Tiptap = ({
  description,
  placeholder = "",
  onChange,
  showToolbar = true,
  plainText = false,
  readonly = false,
  characterLimit = Number(process.env.NEXT_PUBLIC_CHARACTER_LIMIT) || 300,
}: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder, // Placeholder text from props
        emptyEditorClass: "is-editor-empty", // Class to be applied when the editor is empty
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "px-8",
        },
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          levels: [2],
        },
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: "pt-2",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "px-8",
        },
      }),
      Highlight,
      Underline,
      Blockquote,
      CharacterCount.configure({
        limit: characterLimit,
      }),
    ],
    editorProps: {
      attributes: {
        class: "bg-secondary p-2 outline-0 leading-relaxed min-h-[24vh]", // Class for editor styling
      },
      editable: () => !readonly,
    },
    content: description || "", // Ensure content is set correctly
    onUpdate({ editor }) {
      const content = plainText ? editor.getText() : editor.getHTML();
      onChange(content);
    },
  });

  useEffect(() => {
    if (editor && description !== editor.getHTML()) {
      editor.commands.setContent(description);
    }
  }, [description, editor]);

  const characterCount = editor?.storage.characterCount?.characters() || 0;
  const percentage = Math.min((characterCount / characterLimit) * 100, 100);

  // Calculate strokeDashoffset for progress circle
  const circumference = 2 * Math.PI * 9; // 9 is the radius
  const dashOffset = circumference - (circumference * percentage) / 100;

  return (
    <div className='relative overflow-hidden rounded-md'>
      {showToolbar && !readonly ? (
        <>
          <ToolBar editor={editor} />
          <div className='absolute bottom-2 left-2 z-10 flex items-center bg-secondary text-right text-sm text-slate-900'>
            <span className='ml-2'>
              {characterCount}/{characterLimit} کاراکتر
            </span>

            <div className='progress-spinner'>
              <svg width='20' height='20' viewBox='0 0 20 20'>
                <circle
                  cx='10'
                  cy='10'
                  r='9'
                  fill='none'
                  stroke='#e9ecef'
                  strokeWidth='2'
                />
                <circle
                  cx='10'
                  cy='10'
                  r='9'
                  fill='none'
                  stroke='#22c55e'
                  strokeWidth='2'
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  transform='rotate(-90 10 10)'
                  style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
              </svg>
            </div>
          </div>
        </>
      ) : null}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
