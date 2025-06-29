import { Router } from "express";
import {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
} from "../controllers/video.controller.js";
import upload from "../middlewares/multer.middleware.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

// Get all videos
router.route("/").get(getAllVideos); // Get all videos with optional query, sort, and pagination

// Post video
router.route("/v/publish").post(
  verifyToken,
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
); // Publish a new video with video file and thumbnail

//Get video by Id and update , delete video
router
  .route("/v/:videoId")
  .get(verifyToken, getVideoById) // Get a video by ID
  .patch(verifyToken, upload.single("thumbnail"), updateVideo) // Update video details (title, description, thumbnail)
  .delete(verifyToken, deleteVideo); // Delete a video and its associated files, likes, and comments

// Toggle the publish status of a video
router
  .route("/toggle-publish/:videoId")
  .patch(verifyToken, togglePublishStatus);

export default router;
