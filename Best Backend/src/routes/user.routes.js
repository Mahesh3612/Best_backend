import express from "express";
const router = express.Router();

import { createUser, getUsers } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

router.post("/", authMiddleware, createUser);
router.get("/", authMiddleware, getUsers);

export default router;
