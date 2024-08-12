import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Role } from "./entity/Role";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "db_user",
  password: process.env.DB_PASSWORD || "db_pass",
  database: process.env.DB_NAME || "db_name",
  synchronize: process.env.TYPEORM_SYNC === 'true', // Disabilita in produzione
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: [User, Role],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});

