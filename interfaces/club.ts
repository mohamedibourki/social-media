import type { Types } from "mongoose";

export enum ClubCategory {
  Academic = "Academic",
  Sport = "Sport",
  Art = "Art",
  Tech = "Tech",
  Social = "Social",
  Cultural = "Cultural",
  Volunteer = "Volunteer",
  Business = "Business",
  Music = "Music",
  Other = "Other",
}

export interface IClub {
  name: string;
  description?: string;
  category: ClubCategory;
  president: Types.ObjectId; // usually a student
  vicePresident?: Types.ObjectId;
  members: Types.ObjectId[]; // array of student IDs
  supervisor: Types.ObjectId; // usually a teacher/admin
  meetingDays: string[]; // e.g., ["Monday", "Wednesday"]
  meetingTime: {
    start: Date;
    end: Date;
  };
  room: string;
  logoUrl?: string;
  isActive?: boolean;
  tagline?: string; // Short motto or catchphrase
  achievements?: string[]; // Awards or notable accomplishments
  events?: Types.ObjectId[]; // List of event IDs the club has hosted
  applicationRequired?: boolean; // If members need to apply to join
  maxMembers?: number; // Limit on number of members
  memberRoles?: Record<Types.ObjectId, "member" | "officer" | "secretary">; // Custom roles per member
  contactEmail?: string;
  discordServerUrl?: string;
  instagramHandle?: string;
  websiteUrl?: string;
  advisorName?: string; // Alternative to supervisor if you want both
  budget?: number; // Budget allocated to the club
  lastAuditDate?: Date; // Last time the club was reviewed by admin
  memberCount?: number; // Useful for display/performance reasons
  eventCount?: number; // Total events organized by the club
  engagementScore?: number; // Custom metric for activity

  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
