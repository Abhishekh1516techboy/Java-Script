import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import {
  profilePage,
  passwordChange,
  profileUpdate,
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
router.get("/profile/:id", isLoggedIn, profilePage);

// change-password route
router.put("/profile/:id/change-password", isLoggedIn, passwordChange);

// User Profile-Update route
router.put("/profile/:id/update", isLoggedIn, profileUpdate);

export default router;
