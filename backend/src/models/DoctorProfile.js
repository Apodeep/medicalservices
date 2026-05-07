import mongoose from "mongoose";

const doctorProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    specialization: { type: String, required: true },
    bio: { type: String, default: "" },
    experienceYears: { type: Number, default: 0 },
    consultationFee: { type: Number, default: 0 },
    schedule: [
      {
        day: { type: String, required: true },
        start: { type: String, required: true },
        end: { type: String, required: true },
        isAvailable: { type: Boolean, default: true }
      }
    ]
  },
  { timestamps: true }
);

export const DoctorProfile = mongoose.model("DoctorProfile", doctorProfileSchema);
