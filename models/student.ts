import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
    sexe: {
        type: String,
        required: true,
        enum: ['Male', 'Female'],
    },
    className: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classes',
        required: true,
    },
    role: {
        type: String,
        default: "Student"
    },
});

module.exports = mongoose.model("student", studentSchema);