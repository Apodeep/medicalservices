import nodemailer from "nodemailer";
import { env } from "../config/env.js";

export const sendEmail = async ({ to, subject, html }) => {
  if (!env.smtpHost || !env.smtpUser || !env.smtpPass) {
    console.log("Email skipped (SMTP not configured):", subject);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: false,
    auth: { user: env.smtpUser, pass: env.smtpPass }
  });

  await transporter.sendMail({
    from: env.mailFrom,
    to,
    subject,
    html
  });
};
