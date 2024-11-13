import { Schema, model } from "mongoose";

const counterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
  isInitialized: { type: Boolean, default: false },
});

export const Counter = model("Counter", counterSchema);