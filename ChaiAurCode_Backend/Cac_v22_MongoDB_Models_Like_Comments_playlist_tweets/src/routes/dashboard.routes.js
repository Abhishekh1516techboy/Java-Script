import { Router } from "express";
import {
  getChannelStats,
  getChannelVideos,
} from "../controllers/dashboard.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

router.route("/stats").get(getChannelStats);
router.route("/videos").get(getChannelVideos);

export default router;
