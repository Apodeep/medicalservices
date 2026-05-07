import mongoose from "mongoose";

const patientProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    dateOfBirth: { type: Date },
    gender: { type: String, default: "" },
    address: { type: String, default: "" },
    bloodGroup: { type: String, default: "" },
    allergies: [{ type: String }]
  },
  { timestamps: true }
);

export const PatientProfile = mongoose.model("PatientProfile", patientProfileSchema);
