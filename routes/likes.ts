import express from "express";
import { authenticateToken } from "../config/auth";

const router = express.Router();

router.post("/:postId", authenticateToken /* likePost controller */);
router.delete("/:postId", authenticateToken /* unlikePost controller */);
router.get("/user/:userId", authenticateToken /* getUserLikes controller */);

export default router;
