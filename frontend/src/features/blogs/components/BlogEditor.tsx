import { EditorContent } from '@tiptap/react';
import type { Editor } from '@tiptap/react';
import EditorToolbar from './EditorToolbar';

type BlogEditorProps = {
    editor: Editor | null;
};

const BlogEditor = ({ editor }: BlogEditorProps) => {
    if (!editor) return null;

    const wordCount = editor.storage.characterCount?.words() ?? 0;
    const charCount = editor.storage.characterCount?.characters() ?? 0;

    return (
        <div className="rounded-lg border border-white/10 overflow-hidden bg-black/20">
            {/* Toolbar */}
            <EditorToolbar editor={editor} />

            {/* Editor Content Area */}
            <div className="p-4 min-h-[400px] prose prose-invert max-w-none">
                <EditorContent editor={editor} />
            </div>

            {/* Footer — Word/Character count */}
            <div className="flex justify-end gap-4 px-4 py-2 border-t border-white/10 text-xs text-white/40">
                <span>{wordCount} words</span>
                <span>{charCount} characters</span>
            </div>
        </div>
    );
};

export default BlogEditor;
