import mongoose from "mongoose";
import type { ISuperAdmin } from "../interfaces/super-admin";

const superAdminSchema = new mongoose.Schema<ISuperAdmin>({
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
    enum: ['Director'],
  },
},
  { timestamps: true }
)

export const SuperAdminModel = mongoose.model<ISuperAdmin>('SuperAdmin', superAdminSchema);
