import type { Types } from "mongoose";
import type { Subject } from "./subject";

export enum ResourceType {
  Image = "image",
  Video = "video",
  Document = "document"
}

export enum ResourceCategory {
  Exam = "exam",
  Course = "course",
  Exercices = "exercices",
  Project = "project",
  Quiz = 'Quiz',
}

export interface IResource {
  type: ResourceType;
  category: ResourceCategory;
  subject: Subject;
  name: string; // e.g., "exam 2 js"
  description?: string;
  tags?: string[];
  data: string; // base64 or URL
  size: number; // in bytes
  contentType: string; // e.g., "image/png"

  isPublic?: boolean;
  accessList?: string[];
  downloadUrl?: string;
  isArchived?: boolean;
  version?: string;
  views?: number;
  downloads?: number;
  expiresAt?: Date;

  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}