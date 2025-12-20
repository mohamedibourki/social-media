import { Router } from "express";
import { getPoles } from "../controllers/pole";
import { postPole } from "../controllers/pole"

const router = Router();

router.get("/", getPoles);
router.post("/", postPole);

export default router;