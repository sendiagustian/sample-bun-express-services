import { web } from "./app/configs/web";
import { logger } from "./app/utils/logging";

const base = process.env.BASE_URL || "http://127.0.0.1";
const port = process.env.PORT || 3000;

// Start the server
web.listen(port, async () => {
    const data = {
        host: process.env.DB_HOST!,
        port: parseInt(process.env.DB_PORT!),
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!
    };

    logger.info(data.host);
    logger.info(data.port);
    logger.info(data.user);
    logger.info(data.password);
    logger.info(data.database);

    logger.info(`Server is running on ${base}:${port}/api/docs`);
});
