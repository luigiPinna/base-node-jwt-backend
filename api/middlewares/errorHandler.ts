import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`Error occurred: ${err.message}`, { stack: err.stack });

    if (process.env.NODE_ENV === 'development') {
        res.status(500).json({
            status: "error",
            message: err.message,
            stack: err.stack
        });
    } else {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
};

export default errorHandler;