import { Document, Types } from "mongoose";

export interface IComment extends Document {
  text: string;
  author: Types.ObjectId;
  post: Types.ObjectId;
}