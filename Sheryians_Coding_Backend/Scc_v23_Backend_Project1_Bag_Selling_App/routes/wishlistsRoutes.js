import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import {
  wishlistPage,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlistsController.js";
const router = express.Router();

// ********************** /user Routes **********************
// Products wishlist Page Routes
router.get("/", isLoggedIn, wishlistPage);

// User add product to wishlist route
router.post("/add/:id", addToWishlist);

// User add product to wishlist route
router.delete("/remove/:id", isLoggedIn, removeFromWishlist);

export default router;
