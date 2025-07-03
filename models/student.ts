import mongoose from "mongoose";
import type { IStudent } from "../interfaces/student";

const studentSchema = new mongoose.Schema<IStudent>({
    fullName: {
        type: String,
        required: true
    },
    schoolEmail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthDay: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female'],
    },
    className: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classe',
        required: true,
    },
    role: {
        type: String,
        default: "Student"
    },
});

const StudentModel = mongoose.model<IStudent>("student", studentSchema);

export default StudentModel;