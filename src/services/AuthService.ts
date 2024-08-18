import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import { Role } from "../models/Role";
import jwt from "jsonwebtoken";
import config from "../config/config";
import logger from "../utils/logger";

/**
 * Service class for handling authentication-related operations.
 */
export class AuthService {
    // Repositories for database operations
    private userRepository = AppDataSource.getRepository(User);
    private roleRepository = AppDataSource.getRepository(Role);

    /**
     * Registers a new user in the system.
     *
     * @param email - The email address of the new user
     * @param password - The password for the new user
     * @param roleName - The name of the role to assign to the new user
     * @returns Promise<User> - The newly created user object
     * @throws Error if user already exists, role not found, or registration fails
     */
    async register(email: string, password: string, roleName: string): Promise<User> {
        // Check if user already exists
        const existingUser = await this.userRepository.findOneBy({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }

        // Find the role by name
        const role = await this.roleRepository.findOneBy({ name: roleName });
        if (!role) {
            throw new Error("Role not found");
        }

        // Create new user instance
        const user = new User();
        user.email = email;
        user.password = password;
        user.role = role;

        // Hash the password before saving
        user.hashPassword();

        try {
            // Save the new user to the database
            return await this.userRepository.save(user);
        } catch (error) {
            // Log the error and throw a generic error message
            logger.error("Error saving user", {
                message: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined
            });
            throw new Error("Registration failed");
        }
    }

    /**
     * Authenticates a user and generates a JWT token.
     *
     * @param email - The email address of the user
     * @param password - The password of the user
     * @returns Promise<string | null> - JWT token if authentication successful, null otherwise
     * @throws Error if login fails or user has no role assigned
     */
    async login(email: string, password: string): Promise<string | null> {
        try {
            // Find user by email, including their role
            const user = await this.userRepository.findOne({
                where: { email },
                relations: ["role"],
            });

            // Check if user exists and password is valid
            if (!user || !user.checkIfUnencryptedPasswordIsValid(password)) {
                return null;
            }

            // Ensure user has a role assigned
            if (!user.role || !user.role.name) {
                throw new Error("User has no role assigned");
            }

            // Generate and return JWT token
            return jwt.sign(
                { userId: user.id, email: user.email, role: user.role.name },
                config.jwtSecret,
                { expiresIn: "1h" }
            );
        } catch (error) {
            // Log the error and re-throw
            logger.error("Login error", { error });
            throw error;
        }
    }
}