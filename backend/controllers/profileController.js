import Address from "../models/Address.js";
import Certifications from "../models/Certificate.js";
import Experience from "../models/Experience.js";
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import { validateProfileData } from "../utils/validation.js";

export const getProfile = async (req, res) => {
    try {
        const {userId} =  req.params;
        const [address, certifications, experience, profile, user] = await Promise.all([
            Address.findOne({user: userId}),
            Certifications.find({user: userId}),
            Experience.find({user: userId}),
            Profile.findOne({user: userId}).populate({
                path: "user",
                select: ["fullName", "email"]
            }),
            User.findById(userId).select(["fullName", "email"])
        ]);
        return res.status(200).json({
            "message": "fetched profile successfully", 
            "data": {address, certifications, experience, profile, user}
        });
    } catch (error) {
        return res.status(401).json({
            "message": error.message
        });
    }
}

export const profile = async (req, res) => {
    try {
        validateProfileData(req);
        const { profilePic, skills, contact} = req.body;
        const userId = req.user._id;
        const userProfile = await Profile.create({
            user: userId,
            profilePic,
            skills,
            contact
        });
        return res.status(200).json({
            "message": "Profile posted successfully",
            "data": userProfile
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}

export const editProfile = async (req, res) => {
    try {
        validateProfileData(req);
        const userId = req.user._id;
        const { profilePic, skills, contact} = req.body;
        const editedProfile = await Profile.findOneAndUpdate(
            {user: userId}, 
            {profilePic, skills, contact}, 
            {new: true}
        );
        return res.status(200).json({
            "message": "Profile edited successfully",
            "data": editedProfile
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}

export const getLoggedUser  = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findOne(userId);
        if(!user) {
            return res.status(404).json({
                "message": "Unothorized"
            });
        }
        return  res.status(200).json({
            "message": "Feteched user successfully",
            "data": user
        });
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}

export const LoggedUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const profile = await Profile.findOne({user:userId});
        console.log(profile);
        if(!profile) {
            return res.status(404).json({
                "message": "Profile not found"
            });
        }
        return res.status(200).json({
            "message": "profile fetched successfully",
            "data": profile
        });
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}