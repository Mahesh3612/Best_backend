import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

/**
 * CREATE COMMENT
 */
export const createComment = catchAsync(async (req, res, next) => {
  const { postId, userId, text } = req.body;

  if (!postId || !text) {
    return next(new AppError("All fields required", 400));
  }

  const comment = await Comment.create({
    post: postId,
    user: userId,
    text,
  });

  // Increment post comments count
  await Post.findByIdAndUpdate(postId, {
    $inc: { commentsCount: 1 },
  });

  sendResponse(res, {
    statusCode: 201,
    message: "Comment created successfully",
    data: comment,
  });
});

/**
 * GET COMMENTS BY POST
 */
export const getCommentsByPost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  const comments = await Comment.find({ post: postId })
    .populate("user", "username profilePic")
    .sort({ createdAt: 1 });

  sendResponse(res, {
    statusCode: 200,
    message: "Comments fetched successfully",
    data: comments,
  });
});
