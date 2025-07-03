import mongoose, { Document } from "mongoose";

export interface ICategory extends Document {
  nom: string;
  description?: string;
  pole_id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
} 