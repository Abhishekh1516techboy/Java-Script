import { Router } from "express";
import {
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  getPlaylistById,
  getUserPlaylists,
} from "../controllers/playlist.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

// Specific middleware for routes (no file uploads for now)
router.use(upload.none());

//Create Playlist route
router.route("/create").post(createPlaylist);

router
  .route("/:playlistId")
  .get(getPlaylistById) // Get Specifc playlist by Id
  .patch(updatePlaylist) // Update playlsit
  .delete(deletePlaylist); // Delete playlist

// Add video in playlist
router.route("/add/:videoId/:playlistId").patch(addVideoToPlaylist);

// Remove video from playlist
router.route("/remove/:videoId/:playlistId").patch(removeVideoFromPlaylist);

// Get all user playlists
router.route("/u/:userId").get(getUserPlaylists);

export default router;
