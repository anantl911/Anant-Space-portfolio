import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';

// The content type that Tiptap produces / consumes
export type TiptapDocument = Record<string, unknown>;

type UseBlogEditorOptions = {
    content?: TiptapDocument | string;
    editable?: boolean;
};

export const useBlogEditor = (options: UseBlogEditorOptions = {}) => {
    const { content = '', editable = true } = options;

    const editor = useEditor({
        extensions: [
            TextStyle,
            Color,
            // StarterKit v3 bundles: Bold, Italic, Strike, Underline, Code,
            // Heading, Paragraph, BulletList, OrderedList, Blockquote,
            // CodeBlock, HorizontalRule, History, Link, and more.
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],  // Only allow H1, H2, H3
                },
            }),

            // Text alignment — must specify which node types support it
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right', 'justify'],
            }),

            // Images — inline false means images are full-width blocks
            Image.configure({
                inline: false,
                allowBase64: false,
            }),

            // Placeholder shown when editor is empty
            Placeholder.configure({
                placeholder: 'Start writing your blog post...',
            }),

            // Word/character count
            CharacterCount,
        ],
        content,
        editable,
    });

    return editor;
};
