import { Router } from "express";
import { getPoles } from "../controllers/pole";

const router = Router();

router.get("/", getPoles);

export default router;