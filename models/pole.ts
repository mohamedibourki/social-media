import mongoose, { Document, Schema } from "mongoose";
import type { IPole } from "../interfaces/pole";

const poleSchema = new Schema<IPole>(
  {
    nom: {
      type: String,
      required: [true, "Le nom du pôle est requis"],
      trim: true,
      unique: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 300,
    },
  },
  {
    timestamps: true,
  }
);

poleSchema.index({ nom: 1 });

export const PoleModel = mongoose.model<IPole>("Pole", poleSchema);

