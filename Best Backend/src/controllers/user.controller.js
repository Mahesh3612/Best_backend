import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

export const createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  sendResponse(res, {
    statusCode: 201,
    message: "User created successfully",
    data: user,
  });
});

export const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  sendResponse(res, {
    statusCode: 200,
    message: "Users fetched",
    data: users,
  });
});
