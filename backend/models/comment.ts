import { Schema, model, Types } from "mongoose";
import type { IComment } from "../interfaces/comment";

const commentSchema = new Schema<IComment>(
  {
    text: { type: String, required: true, trim: true, maxlength: 300 },
    author: {
      id: { type: Schema.Types.ObjectId, required: true, refPath: 'authorModel' },
      authorModel: { type: String, required: true, enum: ['Student', 'Admin'] }
    },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  { timestamps: true }
);

commentSchema.index({ post: 1 }); // Faster comment lookup per post

export const CommentModel = model<IComment>("Comment", commentSchema);
