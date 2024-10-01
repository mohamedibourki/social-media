import { Schema, model } from "mongoose";

interface IPost {
  id: number;
  content: string;
  picture?: string;
  likes: number;
  comments: Array<string>;
}

const postSchema = new Schema<IPost>(
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
      trim: true,
      required: [true, "Content is required"],
      maxlength: [500, "Content can't exceed 500 characters"],
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
    comments: {
      type: [String],
      default: [],
      validate: {
        validator: function (v: Array<string>) {
          return v.every((comment) => comment.length <= 300);
        },
        message: "Each comment must be 300 characters or less",
      },
    },
  },
  {
    timestamps: true,
  }
);

postSchema.index({ likes: -1, createdAt: -1 });

export const Posts = model<IPost>("Post", postSchema);
