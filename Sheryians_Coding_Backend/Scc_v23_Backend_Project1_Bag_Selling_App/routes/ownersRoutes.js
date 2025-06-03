import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import upload from "../config/multer-config.js";
import {
  profile,
  passwordChange,
  profileUpdate,
  createProductPage,
  createProduct,
  updateProductPage,
  updateProduct,
  deleteProduct,
} from "../controllers/ownersController.js";
import {
  signUpPage,
  signUp,
  loginPage,
  login,
} from "../controllers/ownerAuthController.js";
// import isAdmin from "../middleware.js";
const router = express.Router();

// ********************** /owner Routes **********************
// Render owner signUp page
router.get("/auth/signup", signUpPage);

// owner SignUp Post Routes
router.post("/auth/signup", signUp);

// Render owner login page
router.get("/auth/login", loginPage);

// owner Login Route with Passport and JWT Token
router.post("/auth/login", login);

// owner Profile Routes
router.get("/profile", isLoggedIn, profile);

//change-password Routes
router.put("/profile/change-password", isLoggedIn, passwordChange);

// Owner Profile-Update Routes
router.put(
  "/profile/update",
  upload.single("picture"), // Multer middleware to parse single file
  isLoggedIn,
  profileUpdate
);

// Product Create Page Routes
router.get("/createProduct", isLoggedIn, createProductPage);

// Create New Product Route
router.post(
  "/createProduct",
  upload.single("productImage"), // Multer middleware to parse single file
  isLoggedIn,
  createProduct
);

// Product Update Page Routes
router.get("/updateProduct/:id", isLoggedIn, updateProductPage);

// Update Product Route
router.put(
  "/updateProduct/:id",
  upload.single("productImage"), // Multer middleware to parse single file
  isLoggedIn,
  updateProduct
);

// Delete Product Route
router.delete("/deleteProduct/:id", isLoggedIn, deleteProduct);

export default router;
