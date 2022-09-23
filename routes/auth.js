import express from "express";
import { login, register } from "../controllers/auth.js";
const router = express.Router();

// Register routes
router.post("/register", register);

// Login routes
router.post("/login", login);

export default router;
