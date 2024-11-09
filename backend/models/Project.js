import mongoose from "mongoose";
import validator from "validator";

const projectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String, 
        required: true,
        trim: true
    },
    techStack: {
        type: [String],
        required: true,
        validate: {
            validator: function(value) {
                return value.length >=1
            },
            message: "At least on technology is required"
        }
    },
    projectLink: {
        type: String,
        required: true,
        validate : {
            validator: function(value) {
                return validator.isURL(value);
            },
            message: "Enter a valid demo link"
        }
    }
},{
    timestamps: true
})

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
export default Project;