import express from "express";
// import { jwtAuthMiddleware } from "../jwt.js";
import {
  signUpPage,
  // signUp,
  loginPage,
  // login,
  //   profile,
  //   passwordChange,
} from "../controllers/usersController.js";
const router = express.Router();

// ********************** /user Routes **********************
// User SignUp Post Routes
router.get("/auth/signup", signUpPage);

// Login Route with Passport and JWT Token
router.get("/auth/login", loginPage);

// User Profile Routes
// router.get("/profile/:id", jwtAuthMiddleware, profile);

// Update route for change User password in database by Id
// router.put("/profile/change-password/:id", jwtAuthMiddleware, passwordChange);

export default router;
