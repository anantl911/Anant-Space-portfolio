import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema(
    {
        name: String,
        email: String,
        content: String,
        is_unseen: { type: Boolean, default: true }
    },
    { timestamps: true },
);

export const Message = mongoose.model("Message", messageSchema);
