import express from "express";
import { jwtAuthMiddleware } from "../jwt.js";
// import isAdmin from "../middleware.js";
import { getAllCandidates, castVote, votingResults } from "../controllers/voting.js";
const router = express.Router();

// ********************** /admin/manage Routes **********************
// get all candidates list
router.get("/candidates", jwtAuthMiddleware, getAllCandidates);

// user cast vote only one times
router.post("/vote/:id", jwtAuthMiddleware, castVote);

// voting results by ranking on the basis of votes-Count
router.get("/results", jwtAuthMiddleware, votingResults);

export default router;
