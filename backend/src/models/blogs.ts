import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema(
    {
        title: String,
        author: String,
        content: String,
        tags: [String],
        heroPicture: String,
        visibleFor: [String],
        meta: {
            views: { type: Number, default: 0 },
            likes: { type: Number, default: 0 },
            dislikes: { type: Number, default: 0 },
        },
    },
    { timestamps: true },
);

export const Blog = mongoose.model("Blog", blogSchema);
