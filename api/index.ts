import app from "./app";
import { AppDataSource } from "./data-source";
import logger from "./utils/logger";

// Inizializza il database
AppDataSource.initialize()
    .then(() => {
        logger.info("Connected to the database");
    })
    .catch((error) => {
        logger.error("Error during Data Source initialization", error);
        // Aggiungi una logica per gestire errori critici se necessario
    });

// Esporta l'app per Vercel
export default app;
