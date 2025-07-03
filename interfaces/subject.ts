import mongoose, { Document } from "mongoose";

export interface ISubject extends Document {
  title: string;
  description?: string;
  class_id: mongoose.Types.ObjectId;
  professor_id?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
} 