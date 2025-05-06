import { Schema, model, Types } from "mongoose";

export interface IComment {
  text: string;
  author: Types.ObjectId;
  post: Types.ObjectId;
}

const CommentSchema = new Schema<IComment>(
  {
    text: { type: String, required: true, trim: true, maxlength: 300 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true }
);

CommentSchema.index({ post: 1 }); // Faster comment lookup per post

export const Comment = model<IComment>("Comment", CommentSchema);