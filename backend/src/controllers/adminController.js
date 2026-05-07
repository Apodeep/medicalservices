import asyncHandler from "express-async-handler";
import { User } from "../models/User.js";
import { DoctorProfile } from "../models/DoctorProfile.js";
import { Appointment } from "../models/Appointment.js";
import { ROLES } from "../constants/roles.js";

export const getAnalytics = asyncHandler(async (req, res) => {
  const [doctors, patients, appointments, pendingAppointments] = await Promise.all([
    User.countDocuments({ role: ROLES.DOCTOR }),
    User.countDocuments({ role: ROLES.PATIENT }),
    Appointment.countDocuments(),
    Appointment.countDocuments({ status: "pending" })
  ]);

  res.json({ doctors, patients, appointments, pendingAppointments });
});

export const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await User.find({ role: ROLES.DOCTOR }).select("-password");
  const profiles = await DoctorProfile.find({ user: { $in: doctors.map((d) => d._id) } });
  const map = new Map(profiles.map((p) => [p.user.toString(), p]));
  res.json(doctors.map((d) => ({ ...d.toObject(), profile: map.get(d._id.toString()) || null })));
});

export const createDoctor = asyncHandler(async (req, res) => {
  const { fullName, email, phone, password, specialization, bio, experienceYears, consultationFee } = req.body;

  const user = await User.create({ fullName, email, phone, password, role: ROLES.DOCTOR });
  const profile = await DoctorProfile.create({
    user: user._id,
    specialization,
    bio,
    experienceYears,
    consultationFee
  });

  res.status(201).json({ user, profile });
});

export const updateDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { fullName, phone, specialization, bio, experienceYears, consultationFee } = req.body;

  const user = await User.findById(id);
  if (!user || user.role !== ROLES.DOCTOR) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  if (fullName) user.fullName = fullName;
  if (phone) user.phone = phone;
  await user.save();

  const profile = await DoctorProfile.findOneAndUpdate(
    { user: user._id },
    { specialization, bio, experienceYears, consultationFee },
    { new: true }
  );

  res.json({ user, profile });
});

export const deleteDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await DoctorProfile.findOneAndDelete({ user: id });
  await User.findByIdAndDelete(id);
  res.json({ message: "Doctor deleted" });
});

export const getPatients = asyncHandler(async (req, res) => {
  const patients = await User.find({ role: ROLES.PATIENT }).select("-password");
  res.json(patients);
});

export const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find()
    .populate("doctor", "fullName email")
    .populate("patient", "fullName email")
    .sort({ createdAt: -1 });
  res.json(appointments);
});
