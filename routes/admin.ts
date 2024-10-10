import express from "express";
import { authenticateToken } from "../config/auth";
import {
  adminGetAllUsers,
  adminGetAllPosts,
  adminDeleteUser,
  adminDeletePost,
} from "../controllers/admin";

const router = express.Router();

router.get("/users", authenticateToken, adminGetAllUsers);
router.get("/posts", authenticateToken, adminGetAllPosts);
router.delete("/users/:id", authenticateToken, adminDeleteUser);
router.delete("/posts/:id", authenticateToken, adminDeletePost);

export default router;
