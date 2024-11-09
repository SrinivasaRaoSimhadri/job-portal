import mongoose from "mongoose";
import validator from "validator";
const jobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    applicants: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    companyLogo: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(value) {
                return validator.isURL(value);
            },
            message: "Enter valid Url"
        }  
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    jobDescription: {
        type: String,
        required: true,
        trim: true
    },
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    skills: {
        type: [String],
        required: true,
        validate: {
            validator: function(value) {
                return value.length >=1;
            },
            message: "Minimum one skill is required"
        }
    },
    salary: {
        type: String,
        required: true
    },
    employmentType: {
        type: String,
        enum: ["Full-time", "Part-time", "Internship"],
        required: true
    }
},{
    timestamps: true
});

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default Job;