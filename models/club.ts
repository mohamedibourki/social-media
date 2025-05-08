import mongoose, { Schema, model, Types } from "mongoose";
import type { IClub } from "../interfaces/club";

const clubSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String },
	category: {
		type: String,
		enum: [
			"Academic",
			"Sport",
			"Art",
			"Tech",
			"Social",
			"Cultural",
			"Volunteer",
			"Business",
			"Music",
			"Other"
		],
		required: true
	},
	president: { type: Types.ObjectId, ref: "User", required: true },
	vicePresident: { type: Types.ObjectId, ref: "User" },
	members: [{ type: Types.ObjectId, ref: "User" }],
	supervisor: { type: Types.ObjectId, ref: "User", required: true },
	meetingDays: [{ type: String }],
	meetingTime: {
		start: { type: Date, required: true },
		end: { type: Date, required: true }
	},
	room: { type: String, required: true },
	logoUrl: { type: String },
	isActive: { type: Boolean, default: true },
	tagline: { type: String },
	achievements: [{ type: String }],
	events: [{ type: Types.ObjectId, ref: "Event" }],
	applicationRequired: { type: Boolean, default: false },
	maxMembers: { type: Number },
	memberRoles: {
		type: Map,
		of: {
			type: String,
			enum: ["member", "officer", "secretary"]
		}
	},
	contactEmail: { type: String },
	discordServerUrl: { type: String },
	instagramHandle: { type: String },
	websiteUrl: { type: String },
	advisorName: { type: String },
	budget: { type: Number },
	lastAuditDate: { type: Date },
	memberCount: { type: Number },
	eventCount: { type: Number },
	engagementScore: { type: Number },

	createdBy: { type: Types.ObjectId, ref: "User", required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

export const clubModel = mongoose.model<IClub>("ClassSchedule", clubSchema);