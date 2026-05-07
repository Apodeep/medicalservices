import asyncHandler from "express-async-handler";
import { Appointment } from "../models/Appointment.js";
import { DoctorProfile } from "../models/DoctorProfile.js";

export const getDoctorAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ doctor: req.user._id })
    .populate("patient", "fullName email phone")
    .sort({ date: 1 });
  res.json(appointments);
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const appointment = await Appointment.findOne({ _id: id, doctor: req.user._id });
  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found");
  }

  appointment.status = status;
  await appointment.save();
  res.json(appointment);
});

export const addMedicalNotes = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { medicalNotes, prescription } = req.body;
  const appointment = await Appointment.findOne({ _id: id, doctor: req.user._id });
  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found");
  }

  appointment.medicalNotes = medicalNotes ?? appointment.medicalNotes;
  appointment.prescription = prescription ?? appointment.prescription;
  appointment.status = "completed";
  await appointment.save();
  res.json(appointment);
});

export const updateSchedule = asyncHandler(async (req, res) => {
  const { schedule } = req.body;
  const profile = await DoctorProfile.findOneAndUpdate(
    { user: req.user._id },
    { schedule },
    { new: true, upsert: true }
  );
  res.json(profile);
});

export const getDoctorProfile = asyncHandler(async (req, res) => {
  const profile = await DoctorProfile.findOne({ user: req.user._id });
  res.json(profile);
});
