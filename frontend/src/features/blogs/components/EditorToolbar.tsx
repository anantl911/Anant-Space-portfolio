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

    const isImageActive = editor.isActive('image');
    const imageAttrs = isImageActive ? editor.getAttributes('image') : {};

    const updateImageAttr = (key: string, value: any) => {
        editor.commands.updateAttributes('image', { [key]: value });
    };

    // Helper to build button className based on active state
    const btnClass = (isActive: boolean) =>
        `px-2 py-1 rounded text-sm font-medium transition-all ${isActive
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
                                if (result?.data?.url) {
                                    const url = result.data.url;
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

            {/* ── Image Customization Panel ── */}
            {isImageActive && (
                <div className="w-full flex flex-col md:flex-row gap-4 p-3 mt-2 border-t border-white/10 bg-white/5 text-xs text-white/80 rounded-b-lg">
                    {/* Caption & Alt Text */}
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[#facd8a]/90">Caption</label>
                            <input
                                type="text"
                                value={imageAttrs.caption || ''}
                                onChange={(e) => updateImageAttr('caption', e.target.value)}
                                className="bg-black/40 border border-white/10 rounded px-2 py-1 text-white focus:outline-none focus:border-[#facd8a]"
                                placeholder="Enter image caption..."
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[#facd8a]/90">Alt Text</label>
                            <input
                                type="text"
                                value={imageAttrs.alt || ''}
                                onChange={(e) => updateImageAttr('alt', e.target.value)}
                                className="bg-black/40 border border-white/10 rounded px-2 py-1 text-white focus:outline-none focus:border-[#facd8a]"
                                placeholder="Enter descriptive alt text..."
                            />
                        </div>
                    </div>

                    {/* Justification & Fitting Mode */}
                    <div className="flex-1 flex flex-col gap-3">
                        {/* Alignment */}
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-[#facd8a]/90">Justify Image</span>
                            <div className="flex gap-1 mt-1">
                                {([
                                    { label: 'Left', value: 'left' },
                                    { label: 'Center', value: 'center' },
                                    { label: 'Right', value: 'right' }
                                ] as const).map((align) => (
                                    <button
                                        key={align.value}
                                        type="button"
                                        onClick={() => updateImageAttr('alignment', align.value)}
                                        className={`px-3 py-1 rounded transition-colors ${
                                            imageAttrs.alignment === align.value
                                                ? 'bg-[#facd8a] text-black font-semibold shadow-sm'
                                                : 'bg-white/10 text-white/80 hover:bg-white/20'
                                        }`}
                                    >
                                        {align.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Fitting Mode */}
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-[#facd8a]/90">Fitting Mode</span>
                            <div className="flex gap-1 mt-1">
                                {([
                                    { label: 'Stretch / Fill (Cover)', value: 'cover' },
                                    { label: 'Preserve / Fit (Contain)', value: 'contain' }
                                ] as const).map((fit) => (
                                    <button
                                        key={fit.value}
                                        type="button"
                                        onClick={() => updateImageAttr('objectFit', fit.value)}
                                        className={`px-3 py-1 rounded transition-colors ${
                                            imageAttrs.objectFit === fit.value
                                                ? 'bg-[#facd8a] text-black font-semibold shadow-sm'
                                                : 'bg-white/10 text-white/80 hover:bg-white/20'
                                        }`}
                                    >
                                        {fit.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sizing options */}
                    <div className="flex-1 flex flex-col gap-2">
                        <span className="font-semibold text-[#facd8a]/90">Sizing Options</span>
                        
                        {/* Width Sizing (aspect ratio preserved) */}
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-white/50">Width (Respect Aspect Ratio)</span>
                            <div className="grid grid-cols-4 gap-1 mt-0.5">
                                {([
                                    { label: '25%', value: '25%', h: 'auto' },
                                    { label: '50%', value: '50%', h: 'auto' },
                                    { label: '75%', value: '75%', h: 'auto' },
                                    { label: 'Full', value: '100%', h: 'auto' }
                                ] as const).map((size) => (
                                    <button
                                        key={size.value}
                                        type="button"
                                        onClick={() => {
                                            updateImageAttr('width', size.value);
                                            updateImageAttr('height', size.h);
                                        }}
                                        className={`px-1.5 py-1 rounded text-center transition-colors ${
                                            imageAttrs.width === size.value && (imageAttrs.height === 'auto' || !imageAttrs.height)
                                                ? 'bg-[#facd8a] text-black font-semibold shadow-sm'
                                                : 'bg-white/10 text-white/80 hover:bg-white/20'
                                        }`}
                                    >
                                        {size.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Aspect Ratio Presets (Landscape, Portrait, Square) */}
                        <div className="flex flex-col gap-1 mt-1">
                            <span className="text-[10px] text-white/50">Standard Dimensions (Landscape / Portrait / Square)</span>
                            <div className="grid grid-cols-3 gap-1 mt-0.5">
                                {([
                                    { label: 'Landscape', w: '500px', h: '300px' },
                                    { label: 'Portrait', w: '300px', h: '450px' },
                                    { label: 'Square', w: '350px', h: '350px' }
                                ] as const).map((preset) => {
                                    const isPresetActive = imageAttrs.width === preset.w && imageAttrs.height === preset.h;
                                    return (
                                        <button
                                            key={preset.label}
                                            type="button"
                                            onClick={() => {
                                                updateImageAttr('width', preset.w);
                                                updateImageAttr('height', preset.h);
                                            }}
                                            className={`px-1.5 py-1 rounded text-center transition-colors text-[10px] ${
                                                isPresetActive
                                                    ? 'bg-[#facd8a] text-black font-semibold shadow-sm'
                                                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                                            }`}
                                        >
                                            {preset.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default EditorToolbar;