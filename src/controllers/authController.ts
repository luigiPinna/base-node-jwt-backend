import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";
import { body, validationResult } from "express-validator";
import logger from "../utils/logger";

const authService = new AuthService();

export const registerValidation = [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("role").isString().notEmpty()
];

export const loginValidation = [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 })
];

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role } = req.body;
    try {
        const user = await authService.register(email, password, role);
        res.status(201).json({ message: "User registered successfully", userId: user.id });
    } catch (error) {
        logger.error("Registration error", { error });
        if (error instanceof Error && error.message === "User already exists") {
            return res.status(409).json({ message: "User already exists" });
        }
        if (error instanceof Error && error.message === "Role not found") {
            return res.status(400).json({ message: "Invalid role" });
        }
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const token = await authService.login(email, password);
        if (token) {
            res.json({ token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        logger.error("Login error", { error });
        next(error);
    }
};