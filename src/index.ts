import app from "./app";
import { AppDataSource } from "./data-source";
import logger from "./utils/logger";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        logger.info("Connected to the database");

        app.listen(PORT, () => {
            logger.info(`Server has started at port ${PORT}`);
        });
    })
    .catch((error) => logger.error("Error during Data Source initialization", error));