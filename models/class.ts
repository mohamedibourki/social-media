import { Schema, model } from "mongoose";
import { Pole } from "./pole";
import { Categories } from "./categorie";

export enum Semester {
  First = "First",
  Second = "Second",
}

export enum DigitalClasses {
  WebDevelopment = 1,
  MobileDevelopment = 2,
  ArtificialIntelligence = 3,
  DataScience = 4,
  Cybersecurity = 5,
  CloudComputing = 6,
}

interface IClass {
  id: number;
  Pole: Pole;
  categoryId: number;
  headOfClass: number;
  students: number[];
  schedule: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }[];
  capacity: number;
  isActive: boolean;
  semester: Semester;
  academicYear: string;
}

const classSchema = new Schema<IClass>(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
      index: true,
      immutable: true,
    },
    Pole: {
      type: String as any,
      required: [true, "Pole type is required"],
      enum: Object.values(Pole),
      index: true,
    },
    categoryId: {
      type: Number,
      required: [true, "Category ID is required"],
      validate: {
        validator: async function (categoryId: number): Promise<boolean> {
          try {
            const categoryExists = await Categories.exists({ id: categoryId });
            return categoryExists !== null;
          } catch (error) {
            console.error("Category validation error:", error);
            return false;
          }
        },
        message: "The specified category does not exist",
      },
      index: true,
    },
    headOfClass: {
      type: Number,
      required: [true, "Head of class is required"],
      ref: "Teacher",
      index: true,
    },
    students: {
      type: [Number],
      default: [],
      ref: "Student",
      validate: {
        validator: function (students: number[]) {
          return students.length <= this.capacity;
        },
        message: "Number of students cannot exceed class capacity",
      },
    },
    schedule: [
      {
        dayOfWeek: {
          type: String,
          required: true,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
        startTime: {
          type: String,
          required: true,
          validate: {
            validator: function (time: string) {
              return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
            },
            message: "Start time must be in HH:MM format",
          },
        },
        endTime: {
          type: String,
          required: true,
          validate: {
            validator: function (time: string) {
              return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
            },
            message: "End time must be in HH:MM format",
          },
        },
      },
    ],
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    semester: {
      type: String,
      required: [true, "Semester is required"],
      enum: ["First", "Second"],
    },
    academicYear: {
      type: String,
      required: [true, "Academic year is required"],
      validate: {
        validator: function (year: string) {
          return /^\d{4}-\d{4}$/.test(year);
        },
        message: "Academic year must be in YYYY-YYYY format",
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
classSchema.index({ Pole: 1, categoryId: 1 });
classSchema.index({ academicYear: 1, semester: 1 });
classSchema.index({ isActive: 1 });

// Virtual for getting current enrollment
classSchema.virtual("currentEnrollment").get(function () {
  return this.students.length;
});

// Virtual for checking if class is full
classSchema.virtual("isFull").get(function () {
  return this.students.length >= this.capacity;
});

export const Classes = model<IClass>("Class", classSchema);
