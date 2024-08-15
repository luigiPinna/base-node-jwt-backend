import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import logger from "../utils/logger";

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
    const { email, password, role } = req.body;
    try {
        const user = await authService.register(email, password, role);
        if (user) {
            res.status(201).json({message: "User registered successfully", userId: user.id});
        }
    } catch (error) {
        logger.error("Registration error", { error });
        if (error instanceof Error && error.message === "User already exists") {
            return res.status(409).json({ message: "User already exists" });
        }
        if (error instanceof Error && error.message === "Role not found") {
            return res.status(400).json({ message: "Invalid role" });
        }
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    try{
        if (token) {
            res.json({ token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    }
    catch (error){
        logger.error("Login error", { error });
    }

};
