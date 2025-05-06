import { Schema, model, Types } from "mongoose";

export interface IPost {
  content: string;
  author: Types.ObjectId;
  event: Types.ObjectId;
  likes: Types.ObjectId[];
  comments: Types.ObjectId[];
  media?: string;
}

const PostSchema = new Schema<IPost>(
  {
    content: { type: String, required: true, trim: true, maxlength: 500 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    media: { type: String, default: null },
  },
  { timestamps: true }
);

PostSchema.index({ event: 1, createdAt: -1 }); // Optimize post fetching per event

export const Post = model<IPost>("Post", PostSchema);