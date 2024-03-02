import express from "express";
import { signin, signup } from "../controllers/user.controller.js";
const router = express.Router();
//routes
router.post("/signin", signin);
router.post("/signup", signup);
export default router;
