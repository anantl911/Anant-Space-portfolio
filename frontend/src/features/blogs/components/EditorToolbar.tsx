import FileApi from '@/api/file.api';
import type { Editor } from '@tiptap/react';

type ToolbarProps = {
    editor: Editor | null;
};

const EditorToolbar = ({ editor }: ToolbarProps) => {
    if (!editor) return null;
    // Helper to build button className based on active state
    const btnClass = (isActive: boolean) =>
        `px-2 py-1 rounded text-sm font-medium transition-colors ${
            isActive
                ? 'bg-white/20 text-white'         // Active state
                : 'text-white/60 hover:text-white'  // Inactive state
        }`;
    return (
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10 bg-white/5">
            {/* ── Text Style Group ── */}
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={btnClass(editor.isActive('bold'))}
                title="Bold (Ctrl+B)"
            >
                <b>B</b>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={btnClass(editor.isActive('italic'))}
                title="Italic (Ctrl+I)"
            >
                <i>I</i>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={btnClass(editor.isActive('underline'))}
                title="Underline (Ctrl+U)"
            >
                <u>U</u>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={btnClass(editor.isActive('strike'))}
                title="Strikethrough"
            >
                <s>S</s>
            </button>
            {/* ── Divider ── */}
            <div className="w-px h-5 bg-white/20 mx-1" />
            {/* ── Heading Group ── */}
            {[1, 2, 3].map((level) => (
                <button
                    key={level}
                    onClick={() => editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 }).run()}
                    className={btnClass(editor.isActive('heading', { level }))}
                    title={`Heading ${level}`}
                >
                    H{level}
                </button>
            ))}
            <div className="w-px h-5 bg-white/20 mx-1" />
            <label className="px-2 py-1 rounded text-sm text-white/60 hover:text-white cursor-pointer transition-colors">
                🖼 Image
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            // TODO: Look into this further !IMPORTANT
                            FileApi.upload(file);
                            // // editor.chain().focus().setImage({ src: result.data.url }).run();
                        }
                        e.target.value = '';  // Reset so same file can be re-uploaded
                    }}
                />
            </label>
            {/* ── List Group ── */}
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={btnClass(editor.isActive('bulletList'))}
                title="Bullet List"
            >
                • List
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={btnClass(editor.isActive('orderedList'))}
                title="Numbered List"
            >
                1. List
            </button>
            <div className="w-px h-5 bg-white/20 mx-1" />
            {/* ── Alignment Group ── */}
            {(['left', 'center', 'right', 'justify'] as const).map((align) => (
                <button
                    key={align}
                    onClick={() => editor.chain().focus().setTextAlign(align).run()}
                    className={btnClass(editor.isActive({ textAlign: align }))}
                    title={`Align ${align}`}
                >
                    {align === 'left' && '⫷'}
                    {align === 'center' && '⫿'}
                    {align === 'right' && '⫸'}
                    {align === 'justify' && '⫼'}
                </button>
            ))}
            <div className="w-px h-5 bg-white/20 mx-1" />
            {/* ── Block Group ── */}
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={btnClass(editor.isActive('blockquote'))}
                title="Blockquote"
            >
                ❝ Quote
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={btnClass(editor.isActive('codeBlock'))}
                title="Code Block"
            >
                {'</>'}
            </button>
            <button
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className="px-2 py-1 rounded text-sm text-white/60 hover:text-white transition-colors"
                title="Horizontal Rule"
            >
                ― Rule
            </button>
            <div className="w-px h-5 bg-white/20 mx-1" />
            {/* ── Undo / Redo ── */}
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className="px-2 py-1 rounded text-sm text-white/60 hover:text-white disabled:opacity-30 transition-colors"
                title="Undo (Ctrl+Z)"
            >
                ↩ Undo
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className="px-2 py-1 rounded text-sm text-white/60 hover:text-white disabled:opacity-30 transition-colors"
                title="Redo (Ctrl+Shift+Z)"
            >
                ↪ Redo
            </button>
        </div>
    );
};


export default EditorToolbar;