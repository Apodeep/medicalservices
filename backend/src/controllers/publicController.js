import asyncHandler from "express-async-handler";
import { User } from "../models/User.js";
import { DoctorProfile } from "../models/DoctorProfile.js";
import { ROLES } from "../constants/roles.js";

const services = [
  "General Consultation",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Laboratory Diagnostics",
  "Preventive Care"
];

const testimonials = [
  { name: "Sarah M.", quote: "Professional and caring doctors. Highly recommended." },
  { name: "Ahmed R.", quote: "Booking and follow-up were smooth and very fast." },
  { name: "Nina K.", quote: "Excellent service and modern facilities." }
];

export const publicContent = asyncHandler(async (req, res) => {
  const doctors = await User.find({ role: ROLES.DOCTOR }).select("fullName email avatar");
  const profiles = await DoctorProfile.find({ user: { $in: doctors.map((d) => d._id) } }).select(
    "user specialization bio experienceYears"
  );
  res.json({ doctors, profiles, services, testimonials });
});
