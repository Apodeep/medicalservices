import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    slot: { type: String, required: true },
    reason: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
      default: "pending"
    },
    medicalNotes: { type: String, default: "" },
    prescription: { type: String, default: "" }
  },
  { timestamps: true }
);

appointmentSchema.index({ doctor: 1, date: 1, slot: 1 }, { unique: true });

export const Appointment = mongoose.model("Appointment", appointmentSchema);
