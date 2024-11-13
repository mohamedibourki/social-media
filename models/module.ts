import { Schema, model } from "mongoose";

interface IModule {
  id: number;
  title: string;
  description: string;
  instructor: number; // Reference to Student ID
  students: number[]; // Array of Student IDs
  category: string;
  price: number;
  duration: number; // in hours
  level: "beginner" | "intermediate" | "advanced";
  materials?: string[]; // URLs or file paths
  rating?: number;
  reviews?: string[];
  isPublished: boolean;
}

const moduleSchema = new Schema<IModule>(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
      index: true,
      immutable: true,
    },
    title: {
      type: String,
      required: [true, "Module title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Module description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    instructor: {
      type: Number,
      required: true,
      ref: "Student",
    },
    students: {
      type: [Number],
      default: [],
      ref: "Student",
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    duration: {
      type: Number,
      required: true,
      min: [0, "Duration cannot be negative"],
    },
    level: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "advanced"],
    },
    materials: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot exceed 5"],
      default: 0,
    },
    reviews: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Indexes for better query performance
moduleSchema.index({ title: 1 });
moduleSchema.index({ category: 1 });
moduleSchema.index({ instructor: 1 });
moduleSchema.index({ price: 1 });
moduleSchema.index({ rating: -1 });

export const Modules = model<IModule>("Module", moduleSchema);
