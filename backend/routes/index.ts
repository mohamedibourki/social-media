import { Router } from "express";
import poleRoutes from "./pole";
import authRoutes from "./auth"

const router = Router();

router.use("/poles", poleRoutes);
router.use('/auth', authRoutes)

export default router;
