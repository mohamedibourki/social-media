import { Schema, model } from "mongoose";

interface ISubject {
  id: number;
  name: string;
  description?: string;
  teacherId: number;
  students: number[];
  assignments?: string[];
  resources?: string[];
  schedule?: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
}

const subjectSchema = new Schema<ISubject>(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
      index: true,
      immutable: true,
    },
    name: {
      type: String,
      required: [true, "Subject name is required"],
      trim: true,
      maxlength: [100, "Subject name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    teacherId: {
      type: Number,
      required: true,
      index: true,
    },
    students: {
      type: [Number],
      default: [],
      index: true,
    },
    assignments: {
      type: [String],
      default: [],
    },
    resources: {
      type: [String],
      default: [],
    },
    schedule: [{
      day: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        required: true,
      },
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
    }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
subjectSchema.index({ name: 1 });
subjectSchema.index({ teacherId: 1 });
subjectSchema.index({ students: 1 });

export const Subjects = model<ISubject>("Subject", subjectSchema);
