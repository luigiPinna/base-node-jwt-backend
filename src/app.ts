import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import errorHandler from "./middlewares/errorHandler";
import authRoutes from "./routes/auth";
import healthRoutes from "./routes/health";

const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/health", healthRoutes);

app.use(errorHandler);

export default app;