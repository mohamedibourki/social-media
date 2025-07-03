import mongoose, { Schema, Document, Types } from 'mongoose';
import type { IClass } from '../interfaces/class';

const classSchema = new Schema<IClass>(
  {
    course: { type: String, required: true },
    group: { type: String, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    subjects: [{ type: String }],
    teachers: [{ type: Schema.Types.ObjectId, ref: 'Admin' }],

    semester: { type: Number, required: true },

    leader: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    superVisor: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
    traineeManager: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },

    schedules: [{ type: Schema.Types.ObjectId, ref: 'ClassSchedule' }],
    department: { type: String },

    status: { type: String, enum: ['active', 'archived', 'upcoming'], default: 'active' },
    location: { type: String },
    notes: { type: String },

    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  },
  { timestamps: true }
)
export const ClassModel = mongoose.model<IClass>('Class', ClassSchema); 