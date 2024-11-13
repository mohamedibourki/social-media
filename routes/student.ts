import express from "express";
import { authenticateToken } from "../config/auth";
import {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentProfile,
  createStudent,
} from "../controllers/student";

const router = express.Router();

router.get("/", getAllStudents);
router.get("/:id", authenticateToken, getStudentById);
router.post("/", createStudent);
router.put("/:id", authenticateToken, updateStudent);
router.delete("/:id", deleteStudent);
router.get("/:id/profile", authenticateToken, getStudentProfile);

export default router;
