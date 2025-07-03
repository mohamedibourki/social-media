import { z } from "zod";
import { ResourceCategory, ResourceType } from "../interfaces/resource";
import { Subject } from "../interfaces/subject";

export const resourceValidator = z.object({
    type: z.nativeEnum(ResourceType),
    category: z.nativeEnum(ResourceCategory),
    subject: z.nativeEnum(Subject),
    name: z.string().min(1),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    data: z.string().min(1),
    size: z.number().nonnegative(),
    contentType: z.string().min(1),
    isPublic: z.boolean().optional(),
    accessList: z.array(z.string()).optional(),
    downloadUrl: z.string().optional(),
    isArchived: z.boolean().optional(),
    version: z.string().optional(),
    views: z.number().int().nonnegative().optional(),
    downloads: z.number().int().nonnegative().optional(),
    expiresAt: z.date().optional(),
    createdBy: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid MongoDB ObjectId"),
});