import { Schema, model } from "mongoose";

interface ILike {
  id: number;
  userId: number;
  postId: number;
}

const likeSchema = new Schema<ILike>(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
      index: true,
      immutable: true,
    },
    userId: {
      type: Number,
      required: true,
      index: true,
    },
    postId: {
      type: Number,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

likeSchema.index({ userId: 1, postId: 1 });

export const Likes = model<ILike>("Like", likeSchema);
