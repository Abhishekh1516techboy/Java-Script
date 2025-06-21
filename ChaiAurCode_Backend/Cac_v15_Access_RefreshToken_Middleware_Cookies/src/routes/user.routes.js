import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
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

// ************Secured routes************
// ---------Logout route---------
router.route("/logout").post(verifyToken, logoutUser);

export default router;
