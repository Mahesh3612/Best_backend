import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", authLimiter, login);
router.post("/logout", authMiddleware, logout);

export default router;
