import { validateSignUpData, validateLoginData } from "../utils/validation.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
    try {
        validateSignUpData(req);
        const { email, fullName, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            fullName,
            password: hashedPassword
        });
        await user.save();
        return res.status(200).json({
            "message": "signedUp successfully"
        });
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}

export const login = async(req, res) => {
    try {
        validateLoginData(req);
        const { email, password } = req.body;
        const isExistingUser = await User.findOne({email});
        if(!isExistingUser) {
            return res.status(401).json({
                "message": "Invalid credintials"
            });
        }
        const isPasswordValid = await isExistingUser.isValidPassword(password);
        if(!isPasswordValid) {
            return res.status(401).json({
                "message": "Invalid credintials"
            });
        }
        const token = isExistingUser.get_JWT();
        res.cookie("token", token);
        const {password: _, ...user} = isExistingUser.toObject(); 
        return res.status(200).json({
            "message": "Logged in successfully", 
            "data": user
        });
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}

export const logout = (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });
    return res.status(200).json({
        "message": "Logged out successfully"
    });
}