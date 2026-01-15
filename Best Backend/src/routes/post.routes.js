import express from "express";
import { createPost, getAllPosts } from "../controllers/post.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getAllPosts);

export default router;
