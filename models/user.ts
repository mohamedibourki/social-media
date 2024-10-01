import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const SALT = 10;

interface IUser {
  id: number;
  username: string;
  email: string;
  age: number;
  country: string;
  password: string;
  picture?: string;
  bio?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
      index: true,
      immutable: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [50, "Username can't exceed 50 characters"],
      trim: true,
      index: true,
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
    age: {
      type: Number,
      min: [13, "Age must be at least 13"],
      max: [100, "Age can't exceed 100"],
      default: 18,
    },
    country: {
      type: String,
      default: "Unknown",
      maxlength: [50, "Country name can't exceed 50 characters"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    picture: {
      type: String,
      default: "default-profile.jpg",
    },
    bio: {
      type: String,
      maxlength: [250, "Bio can't exceed 250 characters"],
      trim: true,
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(SALT);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(new Error("Error hashing the password: " + error.message));
  } 
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.virtual("profileUrl").get(function () {
  return `/users/${this.username}`;
});

userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

export const Users = model<IUser>("User", userSchema);
