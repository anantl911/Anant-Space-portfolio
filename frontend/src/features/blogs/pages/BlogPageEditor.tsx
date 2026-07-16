import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogEditor from '../components/BlogEditor';
import { useBlogEditor } from '../hooks/useBlogEditor';
import { useCreateBlog, useUpdateBlog } from '../../../hooks/mutations/useBlogMutations';

const BlogEditorPage = () => {
    const { id } = useParams<{ id: string }>();  // Defined if editing existing blog
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    // Form state for blog metadata
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [heroPicture, setHeroPicture] = useState('');

    // Tiptap editor instance
    const editor = useBlogEditor();

    // Mutations
    const createBlog = useCreateBlog();
    const updateBlog = useUpdateBlog();

    const handleAddTag = () => {
        const trimmed = tagInput.trim();
        if (trimmed && !tags.includes(trimmed)) {
            setTags([...tags, trimmed]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const handlePublish = async () => {
        if (!editor || !title.trim()) return;

        const content = editor.getJSON();  // ← The Tiptap document as JSON

        const blogData = {
            title: title.trim(),
            author: author.trim(),
            content,
            tags,
            heroPicture,
            visibleFor: [],
        };

        if (isEditing && id) {
            await updateBlog.mutateAsync({ id, data: blogData });
        } else {
            await createBlog.mutateAsync(blogData);
        }

        navigate('/Blog');
    };

    const isPending = createBlog.isPending || updateBlog.isPending;

    return (
        <div className="min-h-screen bg-[#1a2224] text-white px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Page Header */}
                <h1 className="text-2xl font-bold">
                    {isEditing ? 'Edit Blog Post' : 'Write New Blog Post'}
                </h1>

                {/* Title */}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Blog title..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-xl
                               placeholder:text-white/30 focus:outline-none focus:border-white/30"
                />

                {/* Author */}
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author name..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                               placeholder:text-white/30 focus:outline-none focus:border-white/30"
                />

                {/* Tags */}
                <div>
                    <div className="flex gap-2 mb-2 flex-wrap">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-white/10 rounded-full text-sm flex items-center gap-2"
                            >
                                {tag}
                                <button
                                    onClick={() => handleRemoveTag(tag)}
                                    className="text-white/40 hover:text-white"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                            placeholder="Add a tag..."
                            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm
                                       placeholder:text-white/30 focus:outline-none focus:border-white/30"
                        />
                        <button
                            onClick={handleAddTag}
                            className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors"
                        >
                            Add Tag
                        </button>
                    </div>
                </div>

                {/* Hero Image URL */}
                <input
                    type="text"
                    value={heroPicture}
                    onChange={(e) => setHeroPicture(e.target.value)}
                    placeholder="Hero image URL (optional)..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                               placeholder:text-white/30 focus:outline-none focus:border-white/30"
                />

                {/* The Editor */}
                <BlogEditor editor={editor} />

                {/* Publish Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handlePublish}
                        disabled={isPending || !title.trim()}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50
                                   rounded-lg font-medium transition-colors"
                    >
                        {isPending ? 'Publishing...' : isEditing ? 'Update' : 'Publish'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default BlogEditorPage;
