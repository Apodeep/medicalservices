import { Router } from "express";
import {
  addMedicalNotes,
  getDoctorAppointments,
  getDoctorProfile,
  updateAppointmentStatus,
  updateSchedule
} from "../controllers/doctorController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.use(protect, authorizeRoles(ROLES.DOCTOR));
router.get("/appointments", getDoctorAppointments);
router.patch("/appointments/:id/status", updateAppointmentStatus);
router.patch("/appointments/:id/notes", addMedicalNotes);
router.get("/profile", getDoctorProfile);
router.put("/schedule", updateSchedule);

export default router;
