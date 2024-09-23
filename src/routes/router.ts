import express from "express";
import { PingController } from "../controllers/ping_controller";

export const router = express.Router();

router.get("/health-check", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.ping();
    res.status(res.statusCode).send(response);
});
