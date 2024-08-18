import "reflect-metadata";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import errorHandler from "./middlewares/errorHandler";
import requestLogger from "./middlewares/requestLogger";
import authRoutes from "./routes/auth";
import healthRoutes from "./routes/health";
import articleRoutes from "./routes/article";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(requestLogger);  // Logger delle richieste

// Home route
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the API!");
});

// Definisci le rotte di autenticazione e health
app.use("/auth", authRoutes);

app.use("/health", healthRoutes);

// Definisci le rotte degli articoli
app.use("/articles", articleRoutes);

// Gestione degli errori
app.use(errorHandler);

export default app;
