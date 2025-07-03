import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  chnageCurrentUserPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

// ---------Register route---------
router.route("/register").post(
  // Multer for upload files
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

// ---------Login route---------
router.route("/login").post(loginUser);

// ---------Refresh token route---------
router.route("/refresh-token").post(refreshAccessToken);

// ************Secured routes************
// ---------Logout route---------
router.route("/logout").post(verifyToken, logoutUser);

// ---------Change Password route---------
router.route("/change-password").post(verifyToken, chnageCurrentUserPassword);

// ---------Get Current User route---------
router.route("/current-user").get(verifyToken, getCurrentUser);

// ---------Update Account Detailes route---------
router.route("/update-account").patch(verifyToken, updateAccountDetails);

// ---------Update User Avatar route---------
router
  .route("/update-avatar")
  .patch(verifyToken, upload.single("avatar"), updateUserAvatar);

// ---------Update User CoverImage route---------
router
  .route("/update-coverimage")
  .patch(verifyToken, upload.single("coverImage"), updateUserCoverImage);

// ---------Get User Channel Profile route---------
router.route("/c/:userName").get(verifyToken, getUserChannelProfile);

// ---------Get User Watch History route---------
router.route("/history").get(verifyToken, getWatchHistory);

export default router;
