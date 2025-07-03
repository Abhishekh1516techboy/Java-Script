import { Router } from "express";
import healthcheck from "../controllers/healthcheck.controller.js";

const router = Router();

// Helth Check route for check Every thing is ok...
router.route("/").get(healthcheck);

export default router;
