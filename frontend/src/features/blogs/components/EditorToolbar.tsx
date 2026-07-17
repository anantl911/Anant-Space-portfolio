import { useEffect, useState } from 'react';
import FileApi from '@/api/file.api';
import type { Editor } from '@tiptap/react';

type ToolbarProps = {
    editor: Editor | null;
};

const EditorToolbar = ({ editor }: ToolbarProps) => {
    // Force re-render when editor state (selection/formatting) changes
    const [, forceUpdate] = useState({});

    useEffect(() => {
        if (!editor) return;

        const handleUpdate = () => forceUpdate({});
        
        editor.on('transaction', handleUpdate);
        editor.on('selectionUpdate', handleUpdate);

        return () => {
            editor.off('transaction', handleUpdate);
            editor.off('selectionUpdate', handleUpdate);
        };
    }, [editor]);

    if (!editor) return null;

    // Helper to build button className based on active state
    const btnClass = (isActive: boolean) =>
        `px-2 py-1 rounded text-sm font-medium transition-all ${
            isActive
                ? 'bg-[rgb(250,205,138)] text-black shadow-sm'         // Active state
                : 'text-white/60 hover:text-white hover:bg-white/10'  // Inactive state
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
            {/* ── Color Picker ── */}
            <div className="flex items-center mx-1">
                <input
                    type="color"
                    onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
                    value={editor.getAttributes('textStyle').color || '#ffffff'}
                    className="w-6 h-6 p-0 border-0 rounded cursor-pointer bg-transparent outline-none"
                    title="Text Color"
                />
            </div>
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
            <label className="px-2 py-1 rounded text-sm text-white/60 hover:text-white hover:bg-white/10 cursor-pointer transition-all">
                🖼 Image
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            try {
                                const result: any = await FileApi.upload(file);
                                if (result?.url || result?.fileUrl) {
                                    const url = result.url || result.fileUrl;
                                    editor.chain().focus().setImage({ src: url }).run();
                                }
                            } catch (err) {
                                console.error('Image upload failed:', err);
                            }
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