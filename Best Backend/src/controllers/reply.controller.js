import Reply from "../models/reply.model.js";
import Comment from "../models/comment.model.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

/**
 * CREATE REPLY
 */
export const createReply = catchAsync(async (req, res, next) => {
  const { commentId, userId, text } = req.body;

  if (!commentId || !userId || !text) {
    return next(new AppError("All fields required", 400));
  }

  const reply = await Reply.create({
    comment: commentId,
    user: userId,
    text,
  });

  // Increment replies count
  await Comment.findByIdAndUpdate(commentId, {
    $inc: { repliesCount: 1 },
  });

  sendResponse(res, {
    statusCode: 201,
    message: "Reply created successfully",
    data: reply,
  });
});

/**
 * GET REPLIES BY COMMENT
 */
export const getRepliesByComment = catchAsync(async (req, res, next) => {
  const { commentId } = req.params;

  const replies = await Reply.find({ comment: commentId })
    .populate("user", "username profilePic")
    .sort({ createdAt: 1 });

  sendResponse(res, {
    statusCode: 200,
    message: "Replies fetched successfully",
    data: replies,
  });
});
