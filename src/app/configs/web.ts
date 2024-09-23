import express, { type Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { router } from "../../routes/router";
import { swaggerMiddleware } from "../middlewares/swagger_middleware";
import { errorMiddleware } from "../middlewares/error_middleware";

export const web: Application = express();

// Middleware
web.use(express.json()); // Parse JSON bodies
web.use(morgan("tiny")); // Log all requests
web.use(express.urlencoded({ extended: true })); // Parse URL-encoded body

// Serve static resources
web.use(express.static("docs")); // Serve the docs folder for swagger

// Serve swagger
web.use("/api/docs", swaggerUi.serve, swaggerMiddleware);

// Register routes
web.use(router);

// Error handling
web.use(errorMiddleware);
