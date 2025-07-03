import mongoose, { Document, Schema } from "mongoose";
import { ICategory } from "../interfaces/category";

const categorySchema = new Schema<ICategory>(
  {
    nom: {
      type: String,
      required: [true, "Le nom de la catégorie est requis"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    pole_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pole",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.index({ pole_id: 1 });
categorySchema.index({ nom: 1 });

const Category = mongoose.model<ICategory>("Category", categorySchema);
export default Category;
