import express from "express";
import { register } from "../controllers/auth.js";
const router = express.Router();

// Register routes
router.post("/register", register);

export default router;
