import mongoose from "mongoose";
import type { IStudent } from "../interfaces/student";

const studentSchema = new mongoose.Schema<IStudent>({
  fullName: {
    type: String,
    required: true
  },
  schoolEmail: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  birthDay: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'],
  },
  className: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  role: {
    type: String,
    default: "Student"
  },
});

export const StudentModel = mongoose.model<IStudent>("Student", studentSchema);

