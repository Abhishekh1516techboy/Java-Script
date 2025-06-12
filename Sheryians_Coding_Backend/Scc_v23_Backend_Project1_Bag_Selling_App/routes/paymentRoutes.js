import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import {
  createOrder,
  paymentVerify,
} from "../controllers/paymentController.js";
const router = express.Router();

// ********************** /user Routes **********************
// Add-To-Cart Product Routes
router.post("/create-order", isLoggedIn, createOrder);

// Add-To-Cart Product Routes
router.post("/verify", isLoggedIn, paymentVerify);

export default router;
