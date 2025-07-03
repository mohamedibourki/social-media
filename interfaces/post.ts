import { Document, Types } from "mongoose";

export interface IPost extends Document {
  content: string;
  author: Types.ObjectId;
  event: Types.ObjectId;
  likes: Types.ObjectId[];
  comments: Types.ObjectId[];
  media?: string;
}