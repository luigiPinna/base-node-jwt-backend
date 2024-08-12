import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
    const { email, password, role } = req.body;
    try {
        const user = await authService.register(email, password, role);
        res.send(user);
    } catch (error) {
        res.status(400).send("User already exists or role not found");
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    if (token) {
        res.send({ token });
    } else {
        res.status(400).send("Invalid credentials");
    }
};
