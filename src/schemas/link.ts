import { model, Schema, Types } from "mongoose";

const linkSchema = new Schema({
    hash: { type: String, required: true, unique: true },
    userId: { type: Types.ObjectId, ref: "Users", required: true }
});

const Link = model("Link", linkSchema);
export default Link;