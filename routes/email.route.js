import express from "express";
import { contactEmail } from "../controllers/email.controller.js";
import { applyEmail } from "../controllers/email-apply.controller.js";
const router = express.Router();

router.post("/send-email", contactEmail);
router.post("/apply-email", applyEmail);
export default router;
