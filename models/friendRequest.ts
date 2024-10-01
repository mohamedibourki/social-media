import { Schema, model } from "mongoose";

interface IFriendRequest {
  id: number;
  senderId: number;
  receiverId: number;
  status: "pending" | "accepted" | "rejected";
  message?: string;
}

const friendRequestSchema = new Schema<IFriendRequest>(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
      index: true,
      immutable: true,
    },
    senderId: {
      type: Number,
      required: true,
      index: true,
    },
    receiverId: {
      type: Number,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    message: {
      type: String,
      maxlength: [200, "Message can't exceed 200 characters"],
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

friendRequestSchema.index({ senderId: 1, receiverId: 1 });

export const FriendRequests = model<IFriendRequest>(
  "FriendRequest",
  friendRequestSchema
);
