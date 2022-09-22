import express from "express";
import {
    createPost,
    getAllPost,
    getPost,
    updatePost,
} from "../controllers/post.js";
const router = express.Router();

// Create a new post
router.post("/create", createPost);

// Get A post
router.get("/:id", getPost);

// Get All Posts
router.get("/", getAllPost);

// Update a post
router.put("/:id", updatePost);

export default router;
