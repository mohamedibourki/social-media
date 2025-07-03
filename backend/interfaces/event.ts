import { Document, Types } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  organizer: Types.ObjectId;
  posts: Types.ObjectId[];
  attendees: Types.ObjectId[];
}