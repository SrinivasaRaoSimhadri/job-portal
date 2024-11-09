import Project from "../models/Project.js";
import { validateProjectData } from "../utils/validation.js";

export const project = async (req, res) => {
    try {
        validateProjectData(req);
        const userId = req.user._id;
        const { projectName, description, techStack, projectLink } = req.body; 
        const newProject = await Project.create({
            user: userId,
            projectName,
            description,
            techStack,
            projectLink
        });
        return res.status(200).json({
            "message": "Project posted successfully",
            "data": newProject
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}

export const deleteProject = async (req, res) => {
    try {
        const userId = req.user._id;
        const { projectId } = req.params;
        const deletedProject = await Project.findByIdAndDelete({user: userId, _id: projectId});
        if(!deleteProject) {
            return res.status(204).json({
                "message": "project not found"
            })
        };
        return res.status(200).json({
            "message": "Project deleted successfully",
            "data": deletedProject
        })
    } catch (error) {
        return res.status(400).json({
            "message": "Project deleted successfully"
        })
    }
}