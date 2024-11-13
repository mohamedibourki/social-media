import { Schema, model } from "mongoose";

interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  hireDate: Date;
  salary: number;
  isActive: boolean;
  manager?: number;
  phoneNumber?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
}

const employeeSchema = new Schema<IEmployee>(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
      index: true,
      immutable: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name can't exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name can't exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      lowercase: true,
      trim: true,
      index: true,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      maxlength: [100, "Position can't exceed 100 characters"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
      maxlength: [100, "Department can't exceed 100 characters"],
    },
    hireDate: {
      type: Date,
      required: [true, "Hire date is required"],
      default: Date.now,
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: [0, "Salary cannot be negative"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    manager: {
      type: Number,
      ref: 'Employee',
      default: null,
    },
    phoneNumber: {
      type: String,
      trim: true,
      maxlength: [20, "Phone number can't exceed 20 characters"],
    },
    address: {
      type: String,
      trim: true,
      maxlength: [200, "Address can't exceed 200 characters"],
    },
    emergencyContact: {
      name: {
        type: String,
        trim: true,
        maxlength: [100, "Emergency contact name can't exceed 100 characters"],
      },
      relationship: {
        type: String,
        trim: true,
        maxlength: [50, "Relationship can't exceed 50 characters"],
      },
      phoneNumber: {
        type: String,
        trim: true,
        maxlength: [20, "Emergency contact phone number can't exceed 20 characters"],
      },
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

// Indexes for improved query performance
employeeSchema.index({ department: 1 });
employeeSchema.index({ manager: 1 });
employeeSchema.index({ isActive: 1 });

// Virtual for full name
employeeSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

export const Employees = model<IEmployee>("Employee", employeeSchema);
