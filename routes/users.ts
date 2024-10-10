import express from "express";
import { authenticateToken } from "../config/auth";

const router = express.Router();

router.get("/", authenticateToken /* getAllUsers controller */);
router.get("/:id", authenticateToken /* getUserById controller */);
router.put("/:id", authenticateToken /* updateUser controller */);
router.delete("/:id", authenticateToken /* deleteUser controller */);
router.get("/:id/profile", authenticateToken /* getUserProfile controller */);

export default router;
