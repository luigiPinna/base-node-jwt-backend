import { Router } from "express";
import {checkBaseHealth, checkHealth} from "../controllers/healthController";

const router = Router();
router.get("/base", checkBaseHealth)
router.get("/", checkHealth);

export default router;