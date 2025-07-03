import type { Types } from 'mongoose';

export interface IClass {
  course: string;                         // e.g. 'Development digital'
  group: string;                         // e.g. '101'
  students: Types.ObjectId[];           // Array of student IDs
  subjects: string[];                   // E.g. ['HTML', 'CSS', 'JavaScript']
  teachers: Types.ObjectId[];           // Multiple teachers

  semester: number;                     // e.g. 1 || 2

  leader: Types.ObjectId;              // main student representative
  superVisor: Types.ObjectId;               // admin assigned to this class
  traineeManager: Types.ObjectId;      // person responsible for interns/trainees

  schedules: Types.ObjectId[];
  department?: string;                 // // e.g. 'Computer Science'

  status?: 'active' | 'archived' | 'upcoming'; // lifecycle status
  location?: string;                 // classroom or online platform
  isOnline?: boolean;                // hybrid support
  notes?: string;                    // extra notes

  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
