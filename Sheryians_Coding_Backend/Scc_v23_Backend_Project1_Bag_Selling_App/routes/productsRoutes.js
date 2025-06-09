import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import {
  productsPage,
  productViewPage,
  productView,
  submitReview,
} from "../controllers/productsController.js";
const router = express.Router();

// ********************** /user Routes **********************
// All Products Show Page Routes
router.get("/shop", productsPage);

// Product view Page Routes
router.get("/view/:id", productViewPage);

// Product view Page Routes
router.get("/api/products", productView);

// Product view Page Routes
router.post("/:productId/reviews", isLoggedIn, submitReview);

// Update route for change User password in database by Id
// router.put("/profile/change-password/:id", jwtAuthMiddleware, passwordChange);

export default router;
