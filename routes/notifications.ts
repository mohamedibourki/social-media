import express from "express";
import { authenticateToken } from "../config/auth";

const router = express.Router();

router.get("/", authenticateToken /* getUserNotifications controller */);
router.put(
  "/:id/read",
  authenticateToken /* markNotificationAsRead controller */
);
router.delete("/:id", authenticateToken /* deleteNotification controller */);

export default router;
