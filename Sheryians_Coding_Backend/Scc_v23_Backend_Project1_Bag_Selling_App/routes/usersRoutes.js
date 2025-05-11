import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import {
  profile,
  //   passwordChange,
} from "../controllers/usersController.js";

import {
  signUpPage,
  signUp,
  loginPage,
  login,
} from "../controllers/userAuthController.js";
const router = express.Router();

// ********************** /user Routes **********************
// User SignUp Post Routes
router.get("/auth/signup", signUpPage);

router.post("/auth/signup", signUp);

// Login Route with JWT Token
router.get("/auth/login", loginPage);

router.post("/auth/login", login);

// User Profile Routes
router.get("/profile/:id", isLoggedIn, profile);

// Update route for change User password in database by Id
// router.put("/profile/change-password/:id", jwtAuthMiddleware, passwordChange);

export default router;
