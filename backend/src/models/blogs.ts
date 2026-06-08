import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema(
    {
        title: String,
        author: String,
        content: Object,
        tags: [String],
        heroPicture: String,
        visibleFor: [String],
        meta: {
            views: { type: Number, default: 0 },
            likes: { type: Number, default: 0 },
            dislikes: { type: Number, default: 0 },
        },
        readingTime: Number,
        status: { type: String, enum: ['draft', 'published'], default: 'draft' },
        excerpt: String,
        slug: { type: String, index: true, unique: true }
    },
    { timestamps: true },
);

export const Blog = mongoose.model("Blog", blogSchema);
