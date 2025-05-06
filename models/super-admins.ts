import mongoose from "mongoose";

const superAdminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 6,
      },
      role: {
        type: String,
        required: true,
        enum: ['Director'],
      },
    },
    { timestamps: true }
)

const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);

export default SuperAdmin