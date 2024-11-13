import { Schema, model } from "mongoose";

interface IEvent {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  organizer: number; // Reference to Student ID
  participants?: number[]; // Array of Student IDs
  type: "academic" | "social" | "sports" | "other";
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  maxParticipants?: number;
  isPublic: boolean;
  attachments?: string[]; // URLs or file paths
  category?: string;
}

const eventSchema = new Schema<IEvent>(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
      index: true,
      immutable: true,
    },
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
      validate: {
        validator: function (this: IEvent, value: Date) {
          return value >= this.startDate;
        },
        message: "End date must be after or equal to start date",
      },
    },
    location: {
      type: String,
      trim: true,
      maxlength: [200, "Location cannot exceed 200 characters"],
    },
    organizer: {
      type: Number,
      required: true,
      ref: "Student",
      index: true,
    },
    participants: {
      type: [Number],
      default: [],
      ref: "Student",
    },
    type: {
      type: String,
      required: true,
      enum: ["academic", "social", "sports", "other"],
      default: "other",
    },
    status: {
      type: String,
      required: true,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
    maxParticipants: {
      type: Number,
      min: [0, "Maximum participants cannot be negative"],
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    attachments: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      trim: true,
      maxlength: [50, "Category cannot exceed 50 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
eventSchema.index({ startDate: 1 });
eventSchema.index({ endDate: 1 });
eventSchema.index({ type: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ isPublic: 1 });

// Virtual for checking if event is full
eventSchema.virtual("isFull").get(function () {
  return this.maxParticipants
    ? (this.participants ?? []).length >= this.maxParticipants
    : false;
});

// Virtual for getting participant count
eventSchema.virtual("participantCount").get(function () {
  return (this.participants ?? []).length;
});

export const Events = model<IEvent>("Event", eventSchema);
