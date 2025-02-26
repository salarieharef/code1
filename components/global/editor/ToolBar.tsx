"use client";
import { Toggle } from "@/components/ui/toggle";
import { type Editor } from "@tiptap/react";
import {
	BoldIcon,
	Heading2,
	Highlighter,
	Italic,
	List,
	PenLine,
	Quote,
	Strikethrough,
	Underline,
} from "lucide-react";

type Props = {
  editor: Editor | null;
};

function ToolBar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  return (
    <div className='flex flex-wrap gap-2 bg-secondary p-2'>
      <Toggle
        size='sm'
        pressed={editor.isActive("heading")}
        className=' data-[state=on]:bg-slate-300'
        onPressedChange={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className='h-4 w-4' />
      </Toggle>

      <Toggle
        size='sm'
        pressed={editor.isActive("bold")}
        className=' data-[state=on]:bg-slate-300'
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <BoldIcon className='h-4 w-4' />
      </Toggle>

      <Toggle
        size='sm'
        pressed={editor.isActive("bulletList")}
        className='data-[state=on]:bg-slate-300'
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className='h-4 w-4' />
      </Toggle>

      <Toggle
        size='sm'
        pressed={editor.isActive("italic")}
        className='data-[state=on]:bg-slate-300'
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className='h-4 w-4' />
      </Toggle>

      <Toggle
        size='sm'
        // pressed={editor.isActive("bulletList")}
        className='data-[state=on]:bg-slate-300'
        onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <PenLine className='h-4 w-4' />
      </Toggle>

      <Toggle
        size='sm'
        pressed={editor.isActive("strike")}
        className='data-[state=on]:bg-slate-300'
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive("underline")}
        className='data-[state=on]:bg-slate-300'
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive("highlight")}
        className='data-[state=on]:bg-slate-300'
        onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
      >
        <Highlighter className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive("blockquote")}
        className='data-[state=on]:bg-slate-300'
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className='h-4 w-4' />
      </Toggle>
    </div>
  );
}

export default ToolBar;
