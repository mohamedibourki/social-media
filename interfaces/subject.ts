import mongoose, { Document } from "mongoose";

export enum Subject {
    French = "french",
    Dev = "dev"
}

export interface ISubject extends Document {
  title: string;
  description?: string;
  class_id: mongoose.Types.ObjectId;
  professor_id?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
} 