import express from "express";
import { authenticateToken } from "../config/auth";
import { loginStudent } from "../controllers/auth";

const router = express.Router();

router.post("/register" /* registerStudent controller */);
router.post("/login", loginStudent);
router.post("/logout", authenticateToken /* logoutStudent controller */);
router.post("/refresh-token" /* refreshToken controller */);

export default router;
