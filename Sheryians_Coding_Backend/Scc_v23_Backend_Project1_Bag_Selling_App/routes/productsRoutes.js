import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import { createProductPage } from "../controllers/productsController.js";
const router = express.Router();

// ********************** /user Routes **********************
// User Profile Routes
router.get("/create", isLoggedIn, createProductPage);

// Update route for change User password in database by Id
// router.put("/profile/change-password/:id", jwtAuthMiddleware, passwordChange);

export default router;
