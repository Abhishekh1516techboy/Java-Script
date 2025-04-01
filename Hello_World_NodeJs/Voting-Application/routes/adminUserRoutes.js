import express from "express";
import { jwtAuthMiddleware } from "../jwt.js";
import {
  getAllUsers,
  deleteUser,
} from "../controllers/user.js";
import isAdmin from "../middleware.js";
const router = express.Router();


// ********************** /admin/manage/u **********************

// get All users by admin
router.get("/users", jwtAuthMiddleware, isAdmin, getAllUsers);

// Delete users by admin permanently
router.delete("/delete/:id", jwtAuthMiddleware, isAdmin, deleteUser);

export default router;
