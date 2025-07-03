// models/subjects.ts
import mongoose, { Document, Schema } from "mongoose";
import {ISubject} from "../interfaces/subject";

// Schema definition
const subjectSchema = new Schema<ISubject>(
  {
    title: {
      type: String,
      required: [true, "Subject title is required"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    professor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
subjectSchema.index({ class_id: 1 });
subjectSchema.index({ professor_id: 1 });

// Export model
const Subject = mongoose.model<ISubject>("Subject", subjectSchema);
export default Subject;
