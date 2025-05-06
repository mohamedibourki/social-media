import { Schema, model, Types } from "mongoose";

export interface IEvent {
  title: string;
  description: string;
  date: Date;
  location: string;
  organizer: Types.ObjectId;
  posts: Types.ObjectId[];
  attendees: Types.ObjectId[];
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, maxlength: 1000 },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

EventSchema.index({ date: 1 }); // Optimize event date queries

export const Event = model<IEvent>("Event", EventSchema);