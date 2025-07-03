import mongoose, { Schema } from "mongoose";
import { type IClassSchedule, AssignmentType } from "../interfaces/classSchedule.ts";
import { Subject } from "../interfaces/subject.ts";

const classScheduleSchema = new Schema<IClassSchedule>(
  {
    subject: {
      type: String,
      enum: Object.values(Subject),
      required: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    room: {
      type: String,
      required: true,
    },
    tags: [String],
    day: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      required: true,
    },
    locationType: {
      type: String,
      enum: ["Onsite", "Online", "Hybrid"],
      required: true,
    },
    onlineLink: String,
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    durationInMinutes: Number,
    notes: String,
    status: {
      type: String,
      enum: ["Scheduled", "Cancelled", "Rescheduled"],
      default: "Scheduled",
    },
    repeatPattern: {
      type: String,
      enum: ["None", "Daily", "Weekly", "Biweekly", "Monthly"],
      default: "None",
    },
    repeatUntil: Date,
    assignmentType: {
      type: String,
      enum: Object.values(AssignmentType),
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

classScheduleSchema.index({ teacher: 1 });
classScheduleSchema.index({ group: 1 });
classScheduleSchema.index({ day: 1 });
classScheduleSchema.index({ subject: 1 });
classScheduleSchema.index({ createdBy: 1 });

export const ClassScheduleModel = mongoose.model<IClassSchedule>("ClassSchedule", classScheduleSchema);