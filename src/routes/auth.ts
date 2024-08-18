import { Router } from "express";
import { register, login, registerValidation, loginValidation } from "../../src/controllers/authController";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

export default router;