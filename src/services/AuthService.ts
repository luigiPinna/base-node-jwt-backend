import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Role } from "../entity/Role";
import jwt from "jsonwebtoken";
import config from "../config/config";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);
  private roleRepository = AppDataSource.getRepository(Role);

  async register(email: string, password: string, roleName: string): Promise<User | null> {
    try {
        const role = await this.roleRepository.findOneBy({ name: roleName });
        if (!role) {
            throw new Error("Role not found");
        }

        const existingUser = await this.userRepository.findOneBy({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }

        let user = new User();
        user.email = email;
        user.password = password;
        user.role = role;

        user.hashPassword();
        return await this.userRepository.save(user);

    } catch (error) {
        // Log error details, but avoid exposing internal errors to the client
        console.error("Error during registration:", error);
        throw new Error("Registration failed");
    }
}



async login(email: string, password: string): Promise<string | null> {
  const user = await this.userRepository.findOne({
      where: { email },
      relations: ["role"],  // Assicurati di caricare il ruolo associato
  });

  if (!user || !user.checkIfUnencryptedPasswordIsValid(password)) {
      return null;
  }

  // Controllo se il ruolo è definito
  if (!user.role || !user.role.name) {
      throw new Error("User has no role assigned");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role.name },
    config.jwtSecret,
    { expiresIn: "1h" }
  );

  return token;
}
}
