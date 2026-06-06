import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema(
    {
        title: String,
        description: [String],
        techTags: {
            general: [String],
            frontend: [String],
            backend: [String],
            database: [String],
            desktop: [String],
            others: [String],
        },
        links: {
            youtube: String,
            github: String,
            deployment: String,
            as_blog: String,
        },
        designatedTag: {
            tag: { type: String, default: null },
            detail: { type: String, default: null },
        },
        visibleFor: [String],
        screenshots: [String],
        startedAt: { type: Date, default: null },
        finishedAt: { type: Date, default: null },
        priority: Number,
    },
    { timestamps: true },
);

export const Project = mongoose.model("Project", projectSchema);
