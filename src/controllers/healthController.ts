import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import logger from "../utils/logger";

export const checkHealth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check database connection
        await AppDataSource.query("SELECT 1");

        // You can add more checks here (e.g., Redis connection, external services)

        res.status(200).json({
            status: "healthy",
            timestamp: new Date().toISOString(),
            database: "connected"
        });
    } catch (error) {
        logger.error("Health check failed", { error });
        res.status(503).json({
            status: "unhealthy",
            timestamp: new Date().toISOString(),
            database: "disconnected"
        });
    }
};