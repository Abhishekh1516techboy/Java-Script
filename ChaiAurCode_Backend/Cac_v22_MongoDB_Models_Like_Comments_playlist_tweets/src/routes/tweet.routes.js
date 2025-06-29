import { Router } from "express";
import {
  createTweet,
  getUserTweets,
  updateTweet,
  deleteTweet,
} from "../controllers/tweet.controller.js";
import upload from "../middlewares/multer.middleware.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

// Specific middleware for routes (no file uploads for now)
router.use(upload.none());

// Create a new tweet
router.route("/").post(createTweet);

// Get all tweets for a specific user
router.route("/user/:userId").get(getUserTweets);

// Update and Delete a specific tweet
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);

export default router;
