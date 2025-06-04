import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import { cartPage, addToCart } from "../controllers/cartsController.js";
const router = express.Router();

// ********************** /user Routes **********************
// Add-To-Cart Product Routes
router.post("/add",addToCart);

// Cart Items Show Page Routes
router.get("/", isLoggedIn, cartPage);

// Update route for change User password in database by Id
// router.put("/profile/change-password/:id", jwtAuthMiddleware, passwordChange);

export default router;
