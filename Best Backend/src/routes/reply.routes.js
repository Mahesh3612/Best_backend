import express from "express";
import {
  createReply,
  getRepliesByComment,
} from "../controllers/reply.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createReply);
router.get("/:commentId", authMiddleware, getRepliesByComment);

export default router;
