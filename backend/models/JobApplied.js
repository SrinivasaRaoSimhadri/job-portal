import mongoose from "mongoose";
const jobAppliedSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    jobApplied: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Job"
    },
    status: {
        type: String,
        enum: ["Apply", "Accept", "Reject"],
        required: true
    }
},{
    timestamps: true
});

const JobApplied = mongoose.models.JobApplied || mongoose.model("JobApplied", jobAppliedSchema);
export default JobApplied;