import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import {
  productsPage,
} from "../controllers/productsController.js";
const router = express.Router();

// ********************** /user Routes **********************
// All Products Show Page Routes
router.get("/", isLoggedIn, productsPage);

// Update route for change User password in database by Id
// router.put("/profile/change-password/:id", jwtAuthMiddleware, passwordChange);

export default router;
