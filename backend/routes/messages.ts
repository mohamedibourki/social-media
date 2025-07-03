import express from "express";
import { authenticateToken } from "../config/auth";

const router = express.Router();

router.post("/", authenticateToken /* sendMessage controller */);
router.get("/inbox", authenticateToken /* getInbox controller */);
router.get("/sent", authenticateToken /* getSentMessages controller */);
router.get("/:id", authenticateToken /* getMessageById controller */);
router.put("/:id/read", authenticateToken /* markMessageAsRead controller */);

export default router;
