import type { Subject } from "./subject";
import type { Types } from "mongoose";

export enum AssignmentType {
  Project = "Project",
  Homework = "Homework",
  Quiz = "Quiz",
}

export interface IClassSchedule {
  subject: Subject;
  teacher: Types.ObjectId;
  group: string;
  students?: Types.ObjectId[];
  room: string;
  tags?: string[];
  day: string;
  locationType: "Onsite" | "Online" | "Hybrid";
  onlineLink?: string;
  startTime: Date,
  endTime: Date,
  color: string,

  durationInMinutes?: number;
  notes?: string;
  status?: "Scheduled" | "Cancelled" | "Rescheduled";
  repeatPattern?: "None" | "Daily" | "Weekly" | "Biweekly" | "Monthly";
  repeatUntil?: Date;
  assignmentType?: AssignmentType;

  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}