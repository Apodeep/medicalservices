import { Router } from "express";
import { publicContent, sendContact } from "../controllers/publicController.js";

const router = Router();

router.get("/content", publicContent);
router.post("/contact", sendContact);

export default router;
