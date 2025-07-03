import { Schema, model, Types } from "mongoose";
import type { ILike } from "../interfaces/like";


const LikeSchema = new Schema<ILike>(
  {
    user: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true }
);

LikeSchema.index({ post: 1, student: 1 }, { unique: true }); // Prevent duplicate likes

export const LikeModel = model<ILike>("Like", LikeSchema);
