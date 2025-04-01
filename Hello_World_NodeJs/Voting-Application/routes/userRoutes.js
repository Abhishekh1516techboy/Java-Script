import express from "express";
import { jwtAuthMiddleware } from "../jwt.js";
import {
  signUp,
  login,
  profile,
  passwordChange,
} from "../controllers/user.js";
const router = express.Router();

// ********************** /user Routes **********************
// User SignUp Post Routes
router.post("/auth/signup", signUp);

// Login Route with Passport and JWT Token
router.post("/auth/login", login);

// User Profile Routes
router.get("/profile/:id", jwtAuthMiddleware, profile);

// Update route for change User password in database by Id
router.put("/profile/change-password/:id", jwtAuthMiddleware, passwordChange);

export default router;
