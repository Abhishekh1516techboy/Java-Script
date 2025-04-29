import express from "express";
// import { jwtAuthMiddleware } from "../jwt.js";
import {
  signUpPage,
  signUp,
  loginPage,
  login,
  //   profile,
  //   passwordChange,
} from "../controllers/ownersController.js";
// import isAdmin from "../middleware.js";
const router = express.Router();

// ********************** /owner Routes **********************
// Render owner signUp page
router.get("/auth/signup", signUpPage);

// owner SignUp Post Routes
router.post("/auth/signup", signUp);

// Render owner login page
router.get("/auth/login", loginPage);

// owner Login Route with Passport and JWT Token
router.post("/auth/login", login);

// owner Profile Routes
// router.get("/profile", jwtAuthMiddleware, isAdmin, profile);

// Update route for change owner password in database by Id
// router.put("/profile/change-password", jwtAuthMiddleware, passwordChange);

export default router;
