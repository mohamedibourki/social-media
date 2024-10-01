import { Schema, model } from "mongoose";

interface INotification {
  id: number;
  userId: number;
  message: string;
  isRead: boolean;
  type?: "message" | "like" | "comment" | "follow";
  actionUrl?: string;
}

const notificationSchema = new Schema<INotification>(
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
    message: {
      type: String,
      required: [true, "Message is required"],
      maxlength: [300, "Message can't exceed 300 characters"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["message", "like", "comment", "follow"],
      default: "message",
    },
    actionUrl: {
      type: String,
      default: null,
      maxlength: [200, "URL can't exceed 200 characters"],
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ userId: 1 });

export const Notifications = model<INotification>(
  "Notification",
  notificationSchema
);
