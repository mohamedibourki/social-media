import { Schema, model, Types } from "mongoose";
import type { IPost } from "../interfaces/post";

const PostSchema = new Schema<IPost>(
  {
    content: { type: String, required: true, trim: true, maxlength: 500 },
    author: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    likes: [
      {
        userId: { type: Schema.Types.ObjectId, required: true, refPath: 'likes.userModel' },
        userModel: { type: String, required: true, enum: ['Student', 'Admin'] }
      }
    ],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    media: { type: String, default: null },
  },
  { timestamps: true }
);

PostSchema.index({ event: 1, createdAt: -1 }); // Optimize post fetching per event

export const PostModel = model<IPost>("Post", PostSchema);
