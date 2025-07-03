import { Document } from "mongoose";

export interface IStudent extends Document {
    fullname: string;
    schoolEmail: string;
    password: string;
    birthDay: Date;
    sexe: 'Male' | 'Female';
    className: string; // Assuming className is a reference to another document
    role: string; // Default is "Student"
    createdAt?: Date;
    updatedAt?: Date;
}