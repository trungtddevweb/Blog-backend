import bcryptjs from "bcryptjs";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import { createError } from "../untils/error.js";

export const register = async (req, res, next) => {
    try {
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });
        await newUser.save();
        res.status(200).json("User has been created!");
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found!"));
        const isCorrect = await bcryptjs.compare(
            req.body.password,
            user.password
        );
        if (!isCorrect)
            return next(createError(400, "Wrong username or password!"));
        const { password, isAdmin, ...otherDetails } = user._doc;
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        );
        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json({ ...otherDetails });
    } catch (err) {
        next(err);
    }
};
