import { Router } from "express";
import { publicContent } from "../controllers/publicController.js";

const router = Router();

router.get("/content", publicContent);

export default router;
