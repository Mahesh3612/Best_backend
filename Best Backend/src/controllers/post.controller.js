import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import sendResponse from "../utils/sendResponse.js";

/**
 * CREATE POST
 */
export const createPost = catchAsync(async (req, res, next) => {
  const { content, image } = req.body;
  const userId = req.userId;

  if (!userId || !content) {
    return next(new AppError("Post content is required", 400));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError("User not found", 400));
  }

  const post = await Post.create({
    user: userId,
    content,
    image,
  });

  sendResponse(res, {
    statusCode: 201,
    message: "Post created successfully",
    data: post,
  });
});

/**
 * GET ALL POSTS
 */
export const getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find()
    .populate("user", "username profilePic")
    .sort({ createdAt: -1 });

  sendResponse(res, {
    statusCode: 200,
    message: "Posts fetched successfully",
    data: posts,
  });
});
