import express from "express";
import { jwtAuthMiddleware } from "../jwt.js";
import isAdmin from "../middleware.js";
import {createCandidate, updateCandidate, deleteCandidate} from "../controllers/candidate.js";
const router = express.Router();

// ********************** /admin/manage Routes **********************
// Candidate create by Admin 
router.post("/candidate/create",jwtAuthMiddleware, isAdmin, createCandidate);

// Update Candidate data by Admin
router.put("/candidate/update/:id",jwtAuthMiddleware, isAdmin, updateCandidate);

// Delete  permanently Candidate by Admin
router.delete("/candidate/delete/:id",jwtAuthMiddleware, isAdmin, deleteCandidate);

export default router;
