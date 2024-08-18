import winston from "winston";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp, ...metadata }) => {
            let msg = `${timestamp} [${level}] : ${message} `;
            if (Object.keys(metadata).length > 0) {
                msg += JSON.stringify(metadata);
            }
            return msg;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

export default logger;