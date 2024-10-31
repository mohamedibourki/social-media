import express from "express";
import { authenticateToken } from "../config/auth";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  createUser,
} from "../controllers/user";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", authenticateToken, getUserById);
router.post("/", createUser);
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);
router.get("/:id/profile", authenticateToken, getUserProfile);

export const usersRouter = router;
