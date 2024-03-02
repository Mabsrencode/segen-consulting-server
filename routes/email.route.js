import express from "express";
import { contactEmail } from "../controllers/email.controller.js";

const router = express.Router();

router.post("/send-email", contactEmail);
export default router;
