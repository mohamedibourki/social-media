import { Schema, model } from "mongoose";

interface IConference {
  id: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  organizer: number; // Reference to Student ID
  speakers: number[]; // Array of Student IDs
  attendees: number[]; // Array of Student IDs
  capacity: number;
  price: number;
  topics: string[];
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  registrationDeadline: Date;
  materials?: string[]; // URLs or file paths
  virtualMeetingUrl?: string;
  isVirtual: boolean;
}

const conferenceSchema = new Schema<IConference>(
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
      required: [true, "Conference title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Conference description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    date: {
      type: Date,
      required: [true, "Conference date is required"],
    },
    location: {
      type: String,
      required: [true, "Conference location is required"],
      trim: true,
      maxlength: [200, "Location cannot exceed 200 characters"],
    },
    organizer: {
      type: Number,
      required: true,
      ref: "Student",
      index: true,
    },
    speakers: {
      type: [Number],
      default: [],
      ref: "Student",
    },
    attendees: {
      type: [Number],
      default: [],
      ref: "Student",
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    topics: {
      type: [String],
      required: true,
      validate: {
        validator: function(v: string[]) {
          return v.length > 0 && v.every(topic => topic.length <= 50);
        },
        message: "At least one topic is required and each topic must be 50 characters or less",
      },
    },
    status: {
      type: String,
      required: true,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
    registrationDeadline: {
      type: Date,
      required: [true, "Registration deadline is required"],
    },
    materials: {
      type: [String],
      default: [],
    },
    virtualMeetingUrl: {
      type: String,
      trim: true,
      maxlength: [500, "Virtual meeting URL cannot exceed 500 characters"],
    },
    isVirtual: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
conferenceSchema.index({ date: 1 });
conferenceSchema.index({ status: 1 });
conferenceSchema.index({ registrationDeadline: 1 });
conferenceSchema.index({ price: 1 });
conferenceSchema.index({ topics: 1 });

// Virtual for checking if registration is open
conferenceSchema.virtual("isRegistrationOpen").get(function() {
  return this.registrationDeadline > new Date() && this.status === "upcoming";
});

// Virtual for checking if conference is full
conferenceSchema.virtual("isFull").get(function() {
  return this.attendees.length >= this.capacity;
});

// Virtual for getting current attendance count
conferenceSchema.virtual("attendeeCount").get(function() {
  return this.attendees.length;
});

export const Conferences = model<IConference>("Conference", conferenceSchema);
