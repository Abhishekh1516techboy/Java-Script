import { Router } from "express";
import {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels,
} from "../controllers/subscription.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

router
  .route("/c/:channelId")
  .get(getUserChannelSubscribers) // Get a Channel by ID
  .post(toggleSubscription); // Subscribe a Channel by ID

// Get a All Subscribed channel by ID
router.route("/u/:subscriberId").get(getSubscribedChannels);

export default router;
