import mongoose from "mongoose";
const { Schema } = mongoose;

const gameSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        author: {
            type: String,
            required: true,
        },
        engine: {
            type: String,
            enum: ["godot", "phaser", "pixijs", "unity", "other"],
            required: true,
        },
        storage: {
            key: {
                type: String,
                default: null
            },
            size: {
                type: Number,
                default: null
            },
            version: {
                type: Number,
                default: 1,
            },
        },
        thumbnail: {
            type: String,
            required: true,
        },
        manifest: {
            entry: {
                type: String,
                default: null
            },
            files: {
                type: [String],
                default: []
            }
        },
        status: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED", "UPLOADING"],
            default: "PENDING",
        },
        rejectionReason: {
            type: String,
            default: null
        },
        plays: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const Game = mongoose.model("Game", gameSchema);
