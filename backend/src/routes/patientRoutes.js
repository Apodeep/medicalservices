import { Router } from "express";
import {
  bookAppointment,
  getMedicalRecords,
  getMyAppointments,
  getPatientProfile,
  listDoctors,
  updatePatientProfile
} from "../controllers/patientController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.use(protect, authorizeRoles(ROLES.PATIENT));
router.get("/doctors", listDoctors);
router.post("/appointments", bookAppointment);
router.get("/appointments", getMyAppointments);
router.get("/records", getMedicalRecords);
router.get("/profile", getPatientProfile);
router.put("/profile", updatePatientProfile);

export default router;
