import mongoose from "mongoose";
import dotenv from "dotenv";
import { initializeCounters } from "../utils/initializeCounter";

dotenv.config();

const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  throw new Error("DB_URI environment variable is not defined");
}

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("MongoDB connected");
    await initializeCounters();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
