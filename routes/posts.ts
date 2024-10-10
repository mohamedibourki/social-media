import express from "express";
import { authenticateToken } from "../config/auth";
import { upload } from "../config/multer";

const router = express.Router();

router.get("/", authenticateToken /* getAllPosts controller */);
router.post(
  "/",
  authenticateToken,
  upload.single("picture") /* createPost controller */
);
router.get("/:id", authenticateToken /* getPostById controller */);
router.put(
  "/:id",
  authenticateToken,
  upload.single("picture") /* updatePost controller */
);
router.delete("/:id", authenticateToken /* deletePost controller */);

export default router;
