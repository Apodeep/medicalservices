import asyncHandler from "express-async-handler";
import crypto from "crypto";
import { User } from "../models/User.js";
import { DoctorProfile } from "../models/DoctorProfile.js";
import { PatientProfile } from "../models/PatientProfile.js";
import { generateToken } from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { ROLES } from "../constants/roles.js";

const resetTokens = new Map();

export const register = asyncHandler(async (req, res) => {
  const { fullName, email, password, role, phone, specialization } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const user = await User.create({ fullName, email, password, role, phone });

  if (role === ROLES.DOCTOR) {
    await DoctorProfile.create({
      user: user._id,
      specialization: specialization || "General Medicine"
    });
  }

  if (role === ROLES.PATIENT) {
    await PatientProfile.create({ user: user._id });
  }

  const token = generateToken(user._id, user.role);
  res.status(201).json({ user: { ...user.toObject(), password: undefined }, token });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id, user.role);
  res.json({
    user: { _id: user._id, fullName: user.fullName, email: user.email, role: user.role },
    token
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "If your email exists, reset instructions were sent" });

  const token = crypto.randomBytes(24).toString("hex");
  resetTokens.set(token, { userId: user._id.toString(), expiresAt: Date.now() + 1000 * 60 * 15 });

  const resetLink = `http://localhost:5173/reset-password?token=${token}`;
  await sendEmail({
    to: email,
    subject: "Clinic Password Reset",
    html: `<p>Use this link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
  });

  res.json({ message: "If your email exists, reset instructions were sent" });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  const data = resetTokens.get(token);

  if (!data || data.expiresAt < Date.now()) {
    res.status(400);
    throw new Error("Invalid or expired reset token");
  }

  const user = await User.findById(data.userId).select("+password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.password = newPassword;
  await user.save();
  resetTokens.delete(token);

  res.json({ message: "Password reset successful" });
});

export const me = asyncHandler(async (req, res) => {
  res.json(req.user);
});
