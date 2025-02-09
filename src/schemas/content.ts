import { model, Schema, Types } from "mongoose";

const contentSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, enum: ["image", "video", "audio", "article"], required: true },
    link: { type: String, required: true },
    tags: [{ type: Types.ObjectId, ref: "Tags" }],
    userId: { type: Types.ObjectId, ref: "User", required: true }
});

const Content = model("Content", contentSchema);
export default Content;