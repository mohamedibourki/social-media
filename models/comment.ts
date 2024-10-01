import { Schema, model } from "mongoose";

interface IComment {
  id: number;
  content: string;
  picture?: string;
  likes: number;
  replies: Array<string>;
}

const commentSchema = new Schema<IComment>(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
      index: true,
      immutable: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      maxlength: [500, "Comment content can't exceed 500 characters"],
    },
    picture: {
      type: String,
      default: null,
    },
    likes: {
      type: Number,
      default: 0,
      min: [0, "Likes cannot be negative"],
    },
    replies: {
      type: [String],
      default: [],
      validate: {
        validator: function (v: Array<string>) {
          return v.every((reply) => reply.length <= 300);
        },
        message: "Each reply must be 300 characters or less",
      },
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.index({ likes: -1, createdAt: -1 });

export const Comments = model<IComment>("Comment", commentSchema);
