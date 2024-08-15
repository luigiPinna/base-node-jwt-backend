import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import { Role } from "../models/Role";
import jwt from "jsonwebtoken";
import config from "../config/config";
import logger from "../utils/logger";

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);
    private roleRepository = AppDataSource.getRepository(Role);

    async register(email: string, password: string, roleName: string): Promise<User> {
        const existingUser = await this.userRepository.findOneBy({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }

        const role = await this.roleRepository.findOneBy({ name: roleName });
        if (!role) {
            throw new Error("Role not found");
        }

        const user = new User();
        user.email = email;
        user.password = password;
        user.role = role;

        user.hashPassword();

        try {
            return await this.userRepository.save(user);
        } catch (error) {
            logger.error("Error saving user", { error });
            throw new Error("Registration failed");
        }
    }

    async login(email: string, password: string): Promise<string | null> {
        try {
            const user = await this.userRepository.findOne({
                where: { email },
                relations: ["role"],
            });

            if (!user || !user.checkIfUnencryptedPasswordIsValid(password)) {
                return null;
            }

            if (!user.role || !user.role.name) {
                throw new Error("User has no role assigned");
            }

            return jwt.sign(
                { userId: user.id, email: user.email, role: user.role.name },
                config.jwtSecret,
                { expiresIn: "1h" }
            );
        } catch (error) {
            logger.error("Login error", { error });
            throw error;
        }
    }
}