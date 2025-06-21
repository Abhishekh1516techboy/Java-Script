import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// -----------Middleware to Verify Access Token-----------
const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    // Extract token from cookies or Authorization header
    let token = req.cookies?.accessToken;

    const authHeader = req.headers?.authorization;

    if (!token && authHeader) {
      // Ensure header starts with "Bearer " prefix
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.slice(7); // Remove "Bearer " (7 characters)
      }
    }

    // Check if token exists
    if (!token) {
      throw new ApiError(401, "Access token required");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // check user exist in DB or not
    const user = await User.findById(decoded?._id);

    if (!user) {
      throw new ApiError(401, "Invalid token: User not found");
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid or expired token");
  }
});

export default verifyToken;
