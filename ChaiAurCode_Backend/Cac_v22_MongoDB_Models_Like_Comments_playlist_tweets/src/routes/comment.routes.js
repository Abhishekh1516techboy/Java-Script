import { Router } from "express";
import {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import upload from "../middlewares/multer.middleware.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

// Specific middleware for routes (no file uploads for now)
router.use(upload.none());

// get video comment and Add comment
router.route("/v/:videoId").get(getVideoComments).post(addComment);

// update video comment and Delete comment
router.route("/c/:commentId").patch(updateComment).delete(deleteComment);

export default router;
