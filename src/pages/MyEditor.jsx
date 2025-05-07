import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function MyEditor({ content, setContent }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      if (newContent !== content) {
        setContent(newContent);
      }
    },
  });

  if (!editor) return null;

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      {/* Editor Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 px-4 rounded-md border border-zinc-300 bg-zinc-800 text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400 ${
            editor.isActive('bold') ? 'bg-zinc-600' : ''
          }`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 px-4 rounded-md border border-zinc-300 bg-zinc-800 text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400 ${
            editor.isActive('italic') ? 'bg-zinc-600' : ''
          }`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="p-2 px-4 rounded-md border border-zinc-300 bg-zinc-800 text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400"
        >
          Strike
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className="p-2 px-4 rounded-md border border-zinc-300 bg-zinc-800 text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400"
        >
          Code
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="p-2 px-4 rounded-md border border-zinc-300 bg-zinc-800 text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400"
        >
          Clear Marks
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className="p-2 px-4 rounded-md border border-zinc-300 bg-zinc-800 text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400"
        >
          Paragraph
        </button>
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <button
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            className={`p-2 px-4 rounded-md border border-zinc-300 bg-zinc-800 text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400 ${
              editor.isActive('heading', { level }) ? 'bg-zinc-600' : ''
            }`}
          >
            H{level}
          </button>
        ))}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="p-2 px-4 rounded-md border border-zinc-300 bg-zinc-800 text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400"
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="p-2 px-4 rounded-md border border-zinc-300 bg-zinc-800 text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400"
        >
          Ordered List
        </button>
      </div>

      {/* Editor Content */}
      <div className="border border-zinc-300 rounded-md p-4 min-h-[200px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
