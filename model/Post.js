import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema(
    {
        userId: { type: String, required: true },
        title: { type: String, required: true },
        image: { type: String, required: true },
        content: { type: String, required: true },
        category: { type: [String], default: "Share" },
    },
    { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
