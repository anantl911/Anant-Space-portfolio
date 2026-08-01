import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';

const CustomImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            caption: {
                default: '',
            },
            width: {
                default: '100%',
            },
            height: {
                default: 'auto',
            },
            objectFit: {
                default: 'cover',
            },
            alignment: {
                default: 'center',
            },
        };
    },
    renderHTML({ HTMLAttributes }) {
        const { alignment, width, height, objectFit, caption, ...rest } = HTMLAttributes;
        
        let style = `width: ${width}; height: ${height === 'auto' ? 'auto' : height}; object-fit: ${objectFit}; display: block; border-radius: 0.75rem; border: 1px solid rgba(255, 255, 255, 0.05);`;
        
        if (alignment === 'left') {
            style += ' margin-right: auto; margin-left: 0;';
        } else if (alignment === 'right') {
            style += ' margin-left: auto; margin-right: 0;';
        } else {
            style += ' margin-left: auto; margin-right: auto;';
        }

        return ['img', { ...rest, style }];
    },
});

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

            // Custom Images with support for alignments, custom sizes, alt and captions
            CustomImage.configure({
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
