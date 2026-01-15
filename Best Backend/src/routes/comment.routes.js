import express from "express";
import {
  createComment,
  getCommentsByPost,
} from "../controllers/comment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createComment);
router.get("/:postId", authMiddleware, getCommentsByPost);

export default router;
