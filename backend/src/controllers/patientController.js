import asyncHandler from "express-async-handler";
import { User } from "../models/User.js";
import { DoctorProfile } from "../models/DoctorProfile.js";
import { Appointment } from "../models/Appointment.js";
import { PatientProfile } from "../models/PatientProfile.js";
import { ROLES } from "../constants/roles.js";

export const listDoctors = asyncHandler(async (req, res) => {
  const doctors = await User.find({ role: ROLES.DOCTOR }).select("-password");
  const profiles = await DoctorProfile.find({ user: { $in: doctors.map((d) => d._id) } });
  const byId = new Map(profiles.map((p) => [p.user.toString(), p]));
  res.json(doctors.map((d) => ({ ...d.toObject(), profile: byId.get(d._id.toString()) || null })));
});

export const bookAppointment = asyncHandler(async (req, res) => {
  const { doctorId, date, slot, reason } = req.body;
  const appointment = await Appointment.create({
    patient: req.user._id,
    doctor: doctorId,
    date,
    slot,
    reason
  });
  res.status(201).json(appointment);
});

export const getMyAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ patient: req.user._id })
    .populate("doctor", "fullName email")
    .sort({ createdAt: -1 });
  res.json(appointments);
});

export const getMedicalRecords = asyncHandler(async (req, res) => {
  const records = await Appointment.find({
    patient: req.user._id,
    status: "completed"
  }).populate("doctor", "fullName");
  res.json(records);
});

export const getPatientProfile = asyncHandler(async (req, res) => {
  const profile = await PatientProfile.findOne({ user: req.user._id });
  res.json(profile);
});

export const updatePatientProfile = asyncHandler(async (req, res) => {
  const profile = await PatientProfile.findOneAndUpdate(
    { user: req.user._id },
    req.body,
    { new: true, upsert: true }
  );
  res.json(profile);
});
