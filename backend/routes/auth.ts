import express from "express";
import { authenticateToken } from "../config/auth";
import {
  loginStudent,
  registerStudent,
  logoutStudent,
  refreshToken,
  checkToken
} from "../controllers/auth";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/check", authenticateToken, checkToken);
router.post("/logout", authenticateToken, logoutStudent);
router.post("/refresh-token", refreshToken);

export default router;
