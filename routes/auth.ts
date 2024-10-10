import express from "express";
import { authenticateToken } from "../config/auth";

const router = express.Router();

router.post("/register" /* registerUser controller */);
router.post("/login" /* loginUser controller */);
router.post("/logout", authenticateToken /* logoutUser controller */);
router.post("/refresh-token" /* refreshToken controller */);

export default router;
