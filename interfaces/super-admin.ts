import { Document } from "mongoose";

export interface ISuperAdmin extends Document {
  fullName: string;
  email: string;
  password: string;
  role: 'Director';
  createdAt?: Date;
  updatedAt?: Date;
}
