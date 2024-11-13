import { Schema, model } from "mongoose";
import validator from "validator";

export enum Pole {
  DigitalAndAI = "Digital & AI",
  Health = "Health",
  Industry = "Industry",
  Construction = "Construction",
  HospitalityAndTourism = "Hospitality & Tourism",
  ArtsAndGraphics = "Arts & Graphics",
  Fishing = "Fishing",
  BusinessAndCommerce = "Business & Commerce",
  Agriculture = "Agriculture",
}

interface IPole {
  id: number;
  name: Pole;
  description?: string;

  // People
  headOfPole?: number;
  deputies?: number[]; // Deputy heads of pole
  categories: number[];
  employees: number[];
  students: number[];

  // Financial & Planning
  budget?: number;
  expenses?: number;
  academicYear?: string;
  objectives?: string[];

  // Administrative
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;

  // Location
  location?: {
    building: string;
    floor: string;
    room?: string;
    capacity?: number;
    facilities?: string[]; // e.g., ["lab", "lecture hall", "workshop"]
  };

  // Additional Features
  contacts?: {
    email?: string;
    phone?: string;
    website?: string;
  };

  equipments?: {
    id: number;
    name: string;
    quantity: number;
    status: "available" | "maintenance" | "broken";
  }[];

  statistics?: {
    graduationRate?: number;
    employmentRate?: number;
    satisfactionScore?: number;
  };

  // Documents & Media
  documents?: {
    id: number;
    type: "syllabus" | "schedule" | "report" | "other";
    url: string;
  }[];

  schedule?: {
    startDate: Date;
    endDate: Date;
    workingHours?: {
      start: string;
      end: string;
    };
  };
}

const poleSchema = new Schema<IPole>(
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
      required: [true, "Pole name is required"],
      trim: true,
      unique: true,
      enum: Object.values(Pole),
      index: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    headOfPole: {
      type: Number,
      ref: "Employee",
      default: null,
    },
    deputies: {
      type: [Number],
      default: [],
      ref: "Employee",
    },
    categories: {
      type: [Number],
      default: [],
      ref: "Category",
      validate: {
        validator: function (v: string[]) {
          return v.every((category) => category.length <= 100);
        },
        message: "Category names cannot exceed 100 characters",
      },
    },
    employees: {
      type: [Number],
      default: [],
      ref: "Employee",
    },
    students: {
      type: [Number],
      default: [],
      ref: "Student",
    },
    budget: {
      type: Number,
      min: [0, "Budget cannot be negative"],
    },
    expenses: {
      type: Number,
      min: [0, "Expenses cannot be negative"],
    },
    academicYear: {
      type: String,
    },
    objectives: {
      type: [String],
      default: [],
      validate: {
        validator: function (v: string[]) {
          return v.every((objective) => objective.length <= 300);
        },
        message: "Each objective cannot exceed 300 characters",
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    createdAt: Date,
    updatedAt: Date,
    location: {
      building: {
        type: String,
        trim: true,
        maxlength: [100, "Building name cannot exceed 100 characters"],
      },
      floor: {
        type: String,
        trim: true,
        maxlength: [20, "Floor identifier cannot exceed 20 characters"],
      },
      room: {
        type: String,
        trim: true,
        maxlength: [50, "Room identifier cannot exceed 50 characters"],
      },
      capacity: {
        type: Number,
        min: [0, "Capacity cannot be negative"],
      },
      facilities: {
        type: [String],
        validate: {
          validator: function (v: string[]) {
            return v.every((facility) => facility.length <= 50);
          },
          message: "Facility names cannot exceed 50 characters",
        },
      },
    },
    contacts: {
      email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email address"],
      },
      phone: String,
      website: {
        type: String,
        validate: [validator.isURL, "Please provide a valid URL"],
      },
    },
    equipments: [
      {
        id: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
          trim: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [0, "Quantity cannot be negative"],
        },
        status: {
          type: String,
          enum: ["available", "maintenance", "broken"],
          default: "available",
        },
      },
    ],
    statistics: {
      graduationRate: {
        type: Number,
        min: [0, "Graduation rate cannot be negative"],
        max: [100, "Graduation rate cannot exceed 100%"],
      },
      employmentRate: {
        type: Number,
        min: [0, "Employment rate cannot be negative"],
        max: [100, "Employment rate cannot exceed 100%"],
      },
      satisfactionScore: {
        type: Number,
        min: [0, "Satisfaction score cannot be negative"],
        max: [100, "Satisfaction score cannot exceed 100"],
      },
    },
    documents: [
      {
        id: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          enum: ["syllabus", "schedule", "report", "other"],
          required: true,
        },
        url: {
          type: String,
          required: true,
          validate: [validator.isURL, "Please provide a valid URL"],
        },
      },
    ],
    schedule: {
      startDate: Date,
      endDate: Date,
      workingHours: {
        start: String,
        end: String,
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
poleSchema.index({ type: 1 });
poleSchema.index({ status: 1 });
poleSchema.index({ headOfPole: 1 });

// Additional indexes for better query performance
poleSchema.index({ "location.building": 1 });
poleSchema.index({ academicYear: 1 });
poleSchema.index({ "equipments.status": 1 });

// Virtual for getting employee count
poleSchema.virtual("employeeCount").get(function () {
  return this.employees.length;
});

// Virtual for getting department count
poleSchema.virtual("categoryCount").get(function () {
  return this.categories.length;
});

export const Poles = model<IPole>("Pole", poleSchema);
