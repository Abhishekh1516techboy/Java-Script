import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import { indexPage } from "../controllers/indexController.js";
const router = express.Router();

// ------------------------Public Routes---------------------------
// Index Page Routes
router.get("/", indexPage);

export default router;
