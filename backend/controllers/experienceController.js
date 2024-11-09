import Experience from "../models/Experience.js";
import { validateExperienceData } from "../utils/validation.js";

export const experience = async (req, res) => {
    try {
        validateExperienceData(req);
        const userId = req.user._id;
        const { jobTitle, company, location, startDate, endDate, responsibilities} = req.body;
        const newExperience = await Experience.create({
            user: userId,
            jobTitle, 
            company, 
            location, 
            startDate, 
            endDate, 
            responsibilities
        })
        return res.status(200).json({
            "message": "Experience posted successfully",
            "data": newExperience
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })   
    }
}

export const deleteExperience = async(req, res)=> {
    try {
        const userId = req.user._id;
        const { experienceId } = req.params;
        const experience = await Experience.findOneAndDelete({user: userId, _id: experienceId});
        if(!experience) {
            return res.status(404).json({
                "message": "Experience not found."
            })
        }
        return res.status(201).json({
            "message": "Experience deleted successfully."
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}

export const getAllExperience = async (req, res) => {
    try {
        const userId = req.user._id;
        const experience = await Experience.find({user: userId});
        if(!experience) {
            return res.status(400).json({
                "message": "No experience listing found"
            })
        }
        return res.status(200).json({
            "message": "experience listing found successfully",
            "data": experience
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}