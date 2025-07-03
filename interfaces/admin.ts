import { Document } from 'mongoose';

export interface IAdmin extends Document {
  fullName: string;
  email: string;
  password: string;
  role: 'Teacher' | 'GS';
  createdAt?: Date;
  updatedAt?: Date;
}
