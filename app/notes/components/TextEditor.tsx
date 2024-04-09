import { useEditor, EditorContent } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading,
  Heading2,
  List,
  ListOrdered,
  Quote,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex p-2 gap-1 justify-between">
      <div className="space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(editor.isActive("bold") ? "bg-accent" : "")}
          type="button"
        >
          <Bold className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(editor.isActive("italic") ? "bg-accent" : "")}
          type="button"
        >
          <Italic className={cn("h-4 w-4 sm:h-5 sm:w-5")} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(editor.isActive("underline") ? "bg-accent" : "")}
          type="button"
        >
          <UnderlineIcon className={cn("h-4 w-4 sm:h-5 sm:w-5")} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(editor.isActive("strike") ? "bg-accent" : "")}
          type="button"
        >
          <Strikethrough className={cn("h-4 w-4 sm:h-5 sm:w-5")} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn(editor.isActive("heading", { level: 2 }) ? "is_active" : "")}
          type="button"
        >
          <Heading className={cn("h-4 w-4 sm:h-5 sm:w-5")} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={cn(editor.isActive("heading", { level: 3 }) ? "is_active" : "")}
          type="button"
        >
          <Heading2 className={cn("h-4 w-4 sm:h-5 sm:w-5 heading3")} />
        </Button>
        {/* <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(editor.isActive("bulletList") ? "is_active" : "")}
          type="button"
        >
          <List className={cn("h-4 w-4 sm:h-5 sm:w-5")} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(editor.isActive("orderedList") ? "is_active" : "")}
          type="button"
        >
          <ListOrdered className={cn("h-4 w-4 sm:h-5 sm:w-5")} />
        </Button> */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(editor.isActive("blockquote") ? "is_active" : "")}
          type="button"
        >
          <Quote className={cn("h-4 w-4 sm:h-5 sm:w-5")} />
        </Button>
      </div>
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()} type="button">
          <RotateCcw className={cn("h-4 w-4 sm:h-5 sm:w-5")} />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()} type="button">
          <RotateCw className={cn("h-4 w-4 sm:h-5 sm:w-5")} />
        </Button>
      </div>
    </div>
  );
};

const TextEditor = ({ setDescription, content }: { setDescription: any; content?: string | null }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: content || "",

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDescription(html);
    },
  });

  return (
    <div className="border rounded-md mt-2">
      <MenuBar editor={editor} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default TextEditor;
