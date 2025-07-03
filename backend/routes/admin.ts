import express from "express";
import { authenticateToken } from "../config/auth";
import {
  adminGetAllStudents,
  adminGetAllPosts,
  adminDeletePost,
  adminDeleteStudent,
} from "../controllers/admin";

const router = express.Router();

router.get("/students", authenticateToken, adminGetAllStudents);
router.get("/posts", authenticateToken, adminGetAllPosts);
router.delete("/students/:id", authenticateToken, adminDeleteStudent);
router.delete("/posts/:id", authenticateToken, adminDeletePost);

export default router;
