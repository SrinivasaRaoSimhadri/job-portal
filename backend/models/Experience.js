import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    jobTitle: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
    },
    responsibilities: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Experience = mongoose.models.Experience || mongoose.model("Experience", experienceSchema);
export default Experience;