import mongoose from "mongoose";
import type { IAdmin } from "../interfaces/admin";

const adminSchema = new mongoose.Schema<IAdmin>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: ['Teacher', 'GS'],
    },
  },
  { timestamps: true }
);

export const AdminModel = mongoose.model<IAdmin>('Admin', adminSchema);
