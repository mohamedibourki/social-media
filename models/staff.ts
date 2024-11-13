import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const SALT = 10;

interface IStaff {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  position: string;
  department: string;
  employeeId: string;
  hireDate: Date;
  salary: number;
  isActive: boolean;
  phoneNumber?: string;
  address?: string;
  picture?: string;
  bio?: string;
  documents?: string[];
  emergencyContact?: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  resetToken?: string;
  resetTokenExpires?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const staffSchema = new Schema<IStaff>(
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
      minlength: [2, "First name must be at least 2 characters long"],
      maxlength: [50, "First name can't exceed 50 characters"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [2, "Last name must be at least 2 characters long"],
      maxlength: [50, "Last name can't exceed 50 characters"],
      trim: true,
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
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
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
    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      unique: true,
      trim: true,
      maxlength: [20, "Employee ID can't exceed 20 characters"],
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
    picture: {
      type: String,
      default: "default-profile.jpg",
    },
    bio: {
      type: String,
      maxlength: [500, "Bio can't exceed 500 characters"],
      trim: true,
    },
    documents: {
      type: [String],
      default: [],
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
    resetToken: String,
    resetTokenExpires: Date,
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

// Password hashing middleware
staffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(SALT);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(new Error("Error hashing the password: " + error.message));
  }
});

// Password comparison method
staffSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Virtual for full name
staffSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for profile URL
staffSchema.virtual("profileUrl").get(function () {
  return `/staff/${this.id}`;
});

// Indexes for better query performance
staffSchema.index({ email: 1 });
staffSchema.index({ employeeId: 1 });
staffSchema.index({ department: 1 });
staffSchema.index({ position: 1 });
staffSchema.index({ isActive: 1 });

export const Staff = model<IStaff>("Staff", staffSchema);
