import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import {
  cartPage,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../controllers/cartsController.js";
const router = express.Router();

// ********************** /user Routes **********************
// Add-To-Cart Product Routes
router.post("/add", addToCart);

// Cart Items Show Page Routes
router.get("/", isLoggedIn, cartPage);

// Update-CartItem-Number Product Routes
router.put("/quantity/update/:id", isLoggedIn, updateCartItemQuantity);

// Remove-To-Cart Product Routes
router.delete("/remove/:id", isLoggedIn, removeFromCart);

// Update route for change User password in database by Id
// router.put("/profile/change-password/:id", jwtAuthMiddleware, passwordChange);

export default router;
