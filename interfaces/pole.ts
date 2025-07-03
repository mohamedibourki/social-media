import mongoose, { Document } from "mongoose";

export interface IPole extends Document {
  nom: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
} 