import express from "express";
import { authenticateToken } from "../config/auth";

const router = express.Router();

router.post("/", authenticateToken /* sendFriendRequest controller */);
router.get(
  "/received",
  authenticateToken /* getReceivedFriendRequests controller */
);
router.get("/sent", authenticateToken /* getSentFriendRequests controller */);
router.put(
  "/:id/accept",
  authenticateToken /* acceptFriendRequest controller */
);
router.put(
  "/:id/reject",
  authenticateToken /* rejectFriendRequest controller */
);

export default router;
