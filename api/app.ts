import "reflect-metadata";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import errorHandler from "./middlewares/errorHandler";
import requestLogger from "./middlewares/requestLogger";
import authRoutes from "./routes/auth";
import healthRoutes from "./routes/health";
import articleRoutes from "./routes/article";

const app = express();

app.use(bodyParser.json());
app.use(requestLogger);  // Logger delle requests

// Home route
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the API!");
});

app.use("/auth", authRoutes);
app.use("/health", healthRoutes);

// Entities
app.use("/articles", articleRoutes);

app.use(errorHandler);

export default app;