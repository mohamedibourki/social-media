import express from "express";
import authRoutes from "./auth";
import studentRoutes from "./student";
import postRoutes from "./posts";
import commentRoutes from "./comments";
import likeRoutes from "./likes";
import messageRoutes from "./messages";
import friendRequestRoutes from "./friendRequests";
import notificationRoutes from "./notifications";
import adminRoutes from "./admin";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/students", studentRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/likes", likeRoutes);
router.use("/messages", messageRoutes);
router.use("/friend-requests", friendRequestRoutes);
router.use("/notifications", notificationRoutes);
router.use("/admin", adminRoutes);

export default router;