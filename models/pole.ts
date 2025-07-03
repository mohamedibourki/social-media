import mongoose, { Document, Schema } from "mongoose";
import {IPole} from "../intefaces/pole";

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

const Pole = mongoose.model<IPole>("Pole", poleSchema);
export default Pole;
