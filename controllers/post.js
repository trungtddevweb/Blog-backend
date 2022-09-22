import Post from "../model/Post.js";

// Create a new Post
export const createPost = async (req, res, next) => {
    try {
        const newPost = new Post(req.body);
        const post = await newPost.save();
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

// Get a post
export const getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

// Get all post
export const getAllPost = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

// Updated Post
export const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        const updated = await post.updateOne({ $set: req.body });
        res.status(200).json("Post has been updated successfully", updated);
    } catch (error) {
        next(error);
    }
};
