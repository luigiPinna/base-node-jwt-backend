import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsEmail, Length } from "class-validator";
import bcrypt from "bcryptjs";
import { Role } from "./Role";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Length(4, 100)
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
