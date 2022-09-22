import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
// Routes
import authRoute from "./routes/auth.js";
import postRoute from "./routes/post.js";
// Middleware
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

// Connect to the database
const connectDB = () => {
    try {
        const connect = mongoose.connect(process.env.URL_DB);
        if (connect) {
            console.log("Connected to database");
        }
    } catch (err) {
        throw err;
    }
};

// Use middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Backend server is running at PORT: ${process.env.PORT}!`);
});
