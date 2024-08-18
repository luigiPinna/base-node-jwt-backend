import * as dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Role } from "./models/Role";
import { Article } from "./models/Article"

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  synchronize: process.env.NODE_ENV !== 'production' && process.env.TYPEORM_SYNC === 'true',
  logging: process.env.NODE_ENV !== 'production' && process.env.TYPEORM_LOGGING === 'true',
  entities: [User, Role, Article], // list of entities in our application
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});