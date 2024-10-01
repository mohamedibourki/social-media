import { Schema, model } from "mongoose";

interface IMessage {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  status?: "sent" | "delivered" | "read";
  attachments?: Array<string>;
}

const messageSchema = new Schema<IMessage>(
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
    content: {
      type: String,
      required: [true, "Message content is required"],
      trim: true,
      maxlength: [1000, "Message content can't exceed 1000 characters"],
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
    attachments: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({ senderId: 1, receiverId: 1 });

export const Messages = model<IMessage>("Message", messageSchema);
