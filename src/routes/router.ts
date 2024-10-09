import express from "express";
import { PingController } from "../controllers/ping_controller";
import { UserController } from "../controllers/user_controller";

export const router = express.Router();

router.get("/health-check", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.ping();
    res.status(res.statusCode).send(response);
});

router.post("/api/v1/user/create", async (req, res, next) => {
    const controller = new UserController(res, next);
    const response = await controller.create(req.body);
    res.status(res.statusCode).send(response);
});

router.get("/api/v1/user/all", async (_req, res, next) => {
    const controller = new UserController(res, next);
    const response = await controller.gets();
    res.status(res.statusCode).send(response);
});

router.get("/api/v1/user/:uid", async (req, res, next) => {
    const controller = new UserController(res, next);
    const response = await controller.getById(req.params.uid);
    res.status(res.statusCode).send(response);
});

router.put("/api/v1/user/update-data/:uid", async (req, res, next) => {
    const controller = new UserController(res, next);
    const response = await controller.updateData(req.params.uid, req.body);
    res.status(res.statusCode).send(response);
});

router.delete("/api/v1/user/delete/:uid", async (req, res, next) => {
    const controller = new UserController(res, next);
    const response = await controller.delete(req.params.uid);
    res.status(res.statusCode).send(response);
});
