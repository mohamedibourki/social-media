
import { Document, Types } from "mongoose";

export interface IStudent extends Document {
    fullName: string;
    schoolEmail: string;
    password: string;
    birthDay: Date;
    gender: 'Male' | 'Female';
    className: Types.ObjectId; // Assuming className is a reference to another document
    role: string; // Default is "Student"
    createdAt?: Date;
    updatedAt?: Date;
}