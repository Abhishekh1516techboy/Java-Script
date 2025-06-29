import { Router } from "express";
import {
  toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
  getLikedVideos,
} from "../controllers/like.controller.js";
import upload from "../middlewares/multer.middleware.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

// Specific middleware for routes (no file uploads for now)
router.use(upload.none());

// Toggle like on a video
router.route("/toggle/v/:videoId").post(toggleVideoLike);

// Toggle like on a comment
router.route("/toggle/c/:commentId").post(toggleCommentLike);

// Toggle like on a tweet
router.route("/toggle/t/:tweetId").post(toggleTweetLike);

// Get all liked videos for the authenticated user
router.route("/videos").get(getLikedVideos);

export default router;