import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/user.routes.js";
import postRoutes from "./src/routes/post.routes.js";
import commentRoutes from "./src/routes/comment.routes.js";
import replyRoutes from "./src/routes/reply.routes.js";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js";
import AppError from "./src/utils/AppError.js";
import errorHandler from "./src/middlewares/error.middleware.js";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/replies", replyRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(errorHandler);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
