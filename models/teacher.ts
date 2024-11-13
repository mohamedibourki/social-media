import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const SALT = 10;

interface ITeacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  subject: string;
  department?: string;
  qualification: string;
  yearsOfExperience: number;
  picture?: string;
  bio?: string;
  resetToken?: string;
  resetTokenExpires?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const teacherSchema = new Schema<ITeacher>(
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
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
    department: {
      type: String,
      trim: true,
      default: null,
    },
    qualification: {
      type: String,
      required: [true, "Qualification is required"],
      trim: true,
    },
    yearsOfExperience: {
      type: Number,
      required: [true, "Years of experience is required"],
      min: [0, "Years of experience cannot be negative"],
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

teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(SALT);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(new Error("Error hashing the password: " + error.message));
  }
});

teacherSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

teacherSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

teacherSchema.virtual("profileUrl").get(function () {
  return `/teachers/${this.id}`;
});

teacherSchema.index({ email: 1 });
teacherSchema.index({ subject: 1 });
teacherSchema.index({ department: 1 });

export const Teachers = model<ITeacher>("Teacher", teacherSchema);
