import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import crypto from "crypto";
import { Pole } from "./pole";
import { DigitalClasses } from "./categorie";
import { Counter } from "../utils/dbConter";

const SALT_ROUNDS = 10;

interface IStudentMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  generatePasswordResetToken(): string;
  isPasswordResetTokenValid(token: string, expiryDate: Date): boolean;
}

interface IStudent extends Document {
  // Basic Information
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: number;
  cin: string;
  birthDate: Date;
  gender?: "male" | "female" | "other";
  nationality: string;
  country: string;
  address: string;

  // Academic Information
  pole: Pole;
  year: number;
  category: string;
  class: number;
  studentId?: string; // School-specific ID
  status: "active" | "inactive" | "graduated" | "suspended";
  enrollmentDate: Date;
  expectedGraduationDate?: Date;

  // Emergency Contact
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  };

  // Academic Records
  academicRecord?: {
    gpa?: number;
    attendance?: number;
    credits: {
      required: number;
      completed: number;
    };
    certifications?: string[];
    awards?: string[];
  };

  // Health & Special Needs
  healthInfo?: {
    bloodType?: string;
    allergies?: string[];
    medications?: string[];
    specialNeeds?: string[];
  };

  // Authentication & Security
  password: string;
  role: "student" | "admin";
  isActive: boolean;
  lastLogin?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  twoFactorEnabled?: boolean;
  loginHistory?: {
    timestamp: Date;
    ipAddress: string;
    device: string;
  }[];

  // Profile & Preferences
  picture?: string;
  bio?: string;
  socialMedia?: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  preferences: {
    notifications: boolean;
    language: string;
    theme: "light" | "dark";
    emailNotifications: {
      assignments: { type: Boolean; default: true };
      grades: { type: Boolean; default: true };
      announcements: { type: Boolean; default: true };
      events: { type: Boolean; default: true };
    };
  };

  // Financial Information
  financialInfo?: {
    tuitionStatus: "paid" | "pending" | "overdue";
    scholarships?: string[];
    payments?: {
      date: Date;
      amount: number;
      status: "completed" | "pending" | "failed";
      reference: string;
    }[];
  };

  // Documents
  documents?: {
    type: "transcript" | "certificate" | "id" | "other";
    name: string;
    url: string;
    uploadDate: Date;
  }[];

  // System Fields
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const studentSchema = new Schema<IStudent, {}, IStudentMethods>(
  {
    // Core Identifiers
    id: {
      type: Number,
      unique: true,
      required: true,
      index: true,
      immutable: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      minlength: [3, "username must be at least 3 characters long"],
      maxlength: [50, "username can't exceed 50 characters"],
      trim: true,
      index: true,
      validate: {
        validator: (value: string) => /^[a-zA-Z0-9_-]+$/.test(value),
        message:
          "username can only contain letters, numbers, underscores and hyphens",
      },
    },

    // Personal Information
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters long"],
      maxlength: [50, "First name can't exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters long"],
      maxlength: [50, "Last name can't exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    phone: {
      type: Number,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
    },
    birthDate: {
      type: Date,
      required: [true, "Birth date is required"],
    },
    country: {
      type: String,
      default: "Unknown",
      maxlength: [50, "Country name can't exceed 50 characters"],
      trim: true,
    },

    // Academic Information
    pole: {
      type: String as any,
      required: [true, "Pole is required"],
      enum: Object.values(Pole),
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: Object.values(DigitalClasses),
    },
    class: {
      type: Number,
      required: [true, "Class is required"],
    },

    // Authentication & Security
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    // Profile & Preferences
    picture: {
      type: String,
      default: "default-profile.jpg",
    },
    bio: {
      type: String,
      maxlength: [250, "Bio can't exceed 250 characters"],
      trim: true,
    },
    preferences: {
      notifications: {
        type: Boolean,
        default: true,
      },
      language: {
        type: String,
        default: "en",
        enum: ["en", "es", "fr", "de"],
      },
      theme: {
        type: String,
        default: "light",
        enum: ["light", "dark"],
      },
    },

    // Status
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },

    // Additional Personal Information
    cin: {
      type: String,
      required: [true, "CIN is required"],
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    nationality: {
      type: String,
      required: [true, "Nationality is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },

    // Additional Academic Information
    year: {
      type: Number,
      required: [true, "Year is required"],
    },
    studentId: String,
    status: {
      type: String,
      enum: ["active", "inactive", "graduated", "suspended"],
      default: "active",
    },
    enrollmentDate: {
      type: Date,
      required: [true, "Enrollment date is required"],
    },
    expectedGraduationDate: Date,

    // Emergency Contact
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
      email: String,
    },

    // Academic Records
    academicRecord: {
      gpa: Number,
      attendance: Number,
      credits: {
        required: Number,
        completed: Number,
      },
      certifications: [String],
      awards: [String],
    },

    // Health Information
    healthInfo: {
      bloodType: String,
      allergies: [String],
      medications: [String],
      specialNeeds: [String],
    },

    // Additional Security Fields
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    loginHistory: [
      {
        timestamp: Date,
        ipAddress: String,
        device: String,
      },
    ],

    // Social Media
    socialMedia: {
      linkedin: String,
      github: String,
      portfolio: String,
    },

    // Financial Information
    financialInfo: {
      tuitionStatus: {
        type: String,
        enum: ["paid", "pending", "overdue"],
        default: "pending",
      },
      scholarships: [String],
      payments: [
        {
          date: Date,
          amount: Number,
          status: {
            type: String,
            enum: ["completed", "pending", "failed"],
          },
          reference: String,
        },
      ],
    },

    // Documents
    documents: [
      {
        type: {
          type: String,
          enum: ["transcript", "certificate", "id", "other"],
        },
        name: String,
        url: String,
        uploadDate: Date,
      },
    ],

    // Additional System Field
    deletedAt: Date,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        const ordered: any = {
          id: ret.id,
          firstName: ret.firstName,
          lastName: ret.lastName,
          username: ret.username,
          email: ret.email,
          phone: ret.phone,
          pole: ret.pole,
          category: ret.category,
          class: ret.class,
          birthDate: ret.birthDate,
          country: ret.country,
          picture: ret.picture,
          isActive: ret.isActive,
          role: ret.role,
          preferences: ret.preferences,
          createdAt: ret.createdAt,
          updatedAt: ret.updatedAt,

          // Virtual fields
          fullName: ret.fullName,
          profileUrl: ret.profileUrl,
          age: ret.age,
        };

        delete ret.password;
        delete ret.resetPasswordToken;
        delete ret.resetPasswordExpires;
        delete ret.__v;
        delete ret._id;

        return ordered;
      },
    },
    toObject: { virtuals: true },
  }
);

// Virtual fields
studentSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

studentSchema.virtual("profileUrl").get(function () {
  return `/students/${this.username}`;
});

studentSchema.virtual("age").get(function (this: IStudent) {
  return Math.floor(
    (Date.now() - this.birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );
});

// Methods
studentSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

studentSchema.methods.generatePasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  return resetToken;
};

// Middleware
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(new Error(`Error hashing password: ${error.message}`));
  }
});

studentSchema.pre("save", function (next) {
  if (this.isModified("email")) {
    this.email = this.email.toLowerCase();
  }
  next();
});

//studentSchema.pre("save", async function (next) {
// try {
// if (!this.id) {
// const counter = await Counter.findByIdAndUpdate(
//  { _id: "studentId" },
//  { $inc: { seq: 1 } },
//  { new: true, upsert: true }
//);
//this.id = counter.seq;
//}
//next();
//} catch (error: any) {
//next(new Error(`Error generating student ID: ${error.message}`));
//}
//});

// Indexes
studentSchema.index({ email: 1 });
studentSchema.index({ username: 1 });
studentSchema.index({ "preferences.language": 1 });
studentSchema.index({ createdAt: -1 });

export const Students = model<IStudent, Model<IStudent, {}, IStudentMethods>>(
  "Students",
  studentSchema
);
