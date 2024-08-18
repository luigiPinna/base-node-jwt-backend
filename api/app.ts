import "reflect-metadata";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import errorHandler from "../src/middlewares/errorHandler";
import requestLogger from "../src/middlewares/requestLogger";
import authRoutes from "../src/routes/auth";
import healthRoutes from "../src/routes/health";
import articleRoutes from "../src/routes/article";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(requestLogger);  // Logger delle richieste

// Home route
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the API!");
});

// Definisci le rotte di autenticazione
app.use("/auth", authRoutes);

// Definisci le rotte di salute
app.use("/health", healthRoutes);

// Definisci le rotte degli articoli
app.use("/articles", articleRoutes);

// Gestione degli errori
app.use(errorHandler);

export default app;
