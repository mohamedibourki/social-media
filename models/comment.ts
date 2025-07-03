import { Schema, model, Types } from "mongoose";
import type { IComment } from "../interfaces/comment";

const CommentSchema = new Schema<IComment>(
  {
    text: { type: String, required: true, trim: true, maxlength: 300 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true }
);

CommentSchema.index({ post: 1 }); // Faster comment lookup per post

export const CommentModel = model<IComment>("Comment", CommentSchema);