import mongoose, { Schema } from "mongoose";
import {
  ResourceCategory,
  ResourceType,
  type IResource,
} from "../interfaces/resource";
import { Subject } from "../interfaces/subject";

const resourceSchema = new Schema<IResource>(
  {
    type: {
      type: String,
      enum: Object.values(ResourceType),
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(ResourceCategory),
      required: true,
    },
    subject: {
      type: String,
      enum: Object.values(Subject),
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    tags: {
      type: [String], // Array of strings
      default: [],
    },
    data: {
      type: String,
      required: true, // Base64 or URL
    },
    size: {
      type: Number,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    accessList: {
      type: [String], // Array of user IDs or roles
      default: [],
    },
    downloadUrl: {
      type: String,
      default: "",
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    version: {
      type: String,
      default: "1.0",
    },
    views: {
      type: Number,
      default: 0,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true, // ID of the admin who created the resource
    },
  },
  { timestamps: true }, // Automatically add createdAt and updatedAt
);

resourceSchema.index({ subject: 1 });
resourceSchema.index({ createdBy: 1 });
resourceSchema.index({ category: 1 });
resourceSchema.index({ createdAt: -1 });

export const ResourceModel = mongoose.model<IResource>("Resource", resourceSchema);