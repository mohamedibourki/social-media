import express from "express";
import { authenticateToken } from "../config/auth";

const router = express.Router();

router.post("/:postId", authenticateToken /* addComment controller */);
router.get("/:postId", authenticateToken /* getCommentsByPost controller */);
router.put("/:id", authenticateToken /* updateComment controller */);
router.delete("/:id", authenticateToken /* deleteComment controller */);

export default router;
