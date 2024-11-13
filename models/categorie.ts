import { Schema, model } from "mongoose";
import { Pole } from "./pole";

export enum DigitalClasses {
  WebDevelopment = "Web Development",
  MobileDevelopment = "Mobile Development",
  ArtificialIntelligence = "Artificial Intelligence",
  DataScience = "Data Science",
  Cybersecurity = "Cybersecurity",
  CloudComputing = "Cloud Computing",
}

export enum HealthClasses {
  Nursing = "Nursing",
  Pharmacy = "Pharmacy",
  PhysicalTherapy = "Physical Therapy",
  MedicalLab = "Medical Laboratory",
  Radiology = "Radiology",
}

export enum IndustryClasses {
  Manufacturing = "Manufacturing",
  AutomationControl = "Automation Control",
  QualityManagement = "Quality Management",
  IndustrialMaintenance = "Industrial Maintenance",
}

interface ICategory {
  id: number;
  name: string;
  description: string;
  Pole: Pole;
  classes: string[];
  status: "active" | "inactive";
  icon?: string;
  color?: string;
}

const categorySchema = new Schema<ICategory>(
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
      required: [true, "Category name is required"],
      trim: true,
      maxlength: [100, "Category name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Category description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    Pole: {
      type: String as any,
      required: [true, "Pole type is required"],
      enum: Object.values(Pole),
      index: true,
    },
    classes: {
      type: [Number],
      default: [],
      ref: "Class",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    icon: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
categorySchema.index({ Pole: 1 });
categorySchema.index({ status: 1 });

export const Categories = model<ICategory>("Category", categorySchema);
