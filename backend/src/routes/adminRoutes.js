import { Router } from "express";
import {
  createDoctor,
  deleteDoctor,
  getAllAppointments,
  getAnalytics,
  getDoctors,
  getPatients,
  updateDoctor
} from "../controllers/adminController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.use(protect, authorizeRoles(ROLES.ADMIN));
router.get("/analytics", getAnalytics);
router.get("/doctors", getDoctors);
router.post("/doctors", createDoctor);
router.put("/doctors/:id", updateDoctor);
router.delete("/doctors/:id", deleteDoctor);
router.get("/patients", getPatients);
router.get("/appointments", getAllAppointments);

export default router;
