import express from "express";
import { jwtAuthMiddleware } from "../jwt.js";
import {
  signUp,
  login,
  profile,
  passwordChange,
} from "../controllers/admin.js";
import isAdmin from "../middleware.js";
const router = express.Router();

// ********************** /user Routes **********************
// admin SignUp Post Routes
router.post("/auth/signup", signUp);

// Login Route with Passport and JWT Token
router.post("/auth/login", login);

// admin Profile Routes
router.get("/profile", jwtAuthMiddleware, isAdmin, profile);

// Update route for change admin password in database by Id
router.put("/profile/change-password", jwtAuthMiddleware, passwordChange);

export default router;
