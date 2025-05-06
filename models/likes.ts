import { Schema, model, Types } from "mongoose";

export interface ILike {
  user: Types.ObjectId;
  post: Types.ObjectId;
}

const LikeSchema = new Schema<ILike>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true }
);

LikeSchema.index({ post: 1, user: 1 }, { unique: true }); // Prevent duplicate likes

export const Like = model<ILike>("Like", LikeSchema);