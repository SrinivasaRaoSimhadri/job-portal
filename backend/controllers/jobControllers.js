import mongoose from "mongoose";
import { validateJobData } from "../utils/validation.js";
import Job from "../models/Job.js";
import JobApplied from "../models/JobApplied.js";
import Following from "../models/Following.js";


export const getJobs = async (req, res) =>{
    try {
        const jobs = await Job.find({});
        if(jobs.length === 0) {
            return res.status(404).json({
                "message": "No jobs found."
            });
        }
        return res.status(200).json({
            "message": "jobs fetched successfully.", 
            "data": jobs
        });
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}


export const loggedUserPostedJobs = async (req, res)=>{
    try {
        const userId = req.user._id;
        const jobs = await Job.find({user: userId});
        if(jobs.length === 0) {
            return res.status(404).json({
                "message": "No jobs found."
            });
        }
        return res.status(200).json({
            "message": "jobs fetched successfully.", 
            "data": jobs
        });
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}

export const getJob = async (req, res)=> {
    try {
        console.log("the code is getting invoked here");
        const { JobId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(JobId)) {
            return res.status(400).json({
                "message": "Invalid job id."
            });
        }
        let job = await Job.findById(JobId);
        if(!job) {
            return res.status(404).json({
                "message": "Job not found."
            });
        }
        job = await job.populate({
            path: "applicants",
            select: ["fullName", "email", "_id"]
        })
        return res.status(200).json({
            "message": "Job fetched successfully.",
            "data": job
        });
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}

export const postJob =async (req, res)=> {
    try {
        validateJobData(req);
        const userId = req.user._id; 
        const { 
            companyLogo,
            title, 
            jobDescription, 
            companyName, 
            location, 
            skills, 
            salary, 
            employmentType 
        } = req.body;
        const newJob = await Job.create({
            companyLogo,
            user: userId,
            title,
            jobDescription,
            companyName,
            location,
            skills,
            salary,
            employmentType
        });
        return res.status(200).json({
            "message": "job posted successfully",
            "date": newJob
        });
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}

export const applyJob = async (req, res) => {
    try {
        const userId = req.user._id;
        const { JobId } = req.params;
        if(!JobId || !JobId.trim()) {
            return res.status(400).json({
                "message": "Invalid request"
            })
        }
        if(!mongoose.Types.ObjectId.isValid(JobId)) {
            return res.status(400).json({
                "message": "Invalid jobId."
            })
        }
        const job = await Job.findById(JobId);
        if(!job){
            return res.status(404).json({
                "message": "Job not found."
            })
        }
        if(job.user.toString() === userId.toString()) {
            return res.status(400).json({
                "message": "you cannot apply job posted by yourself"
            })
        } 
        const isJobApplied = await JobApplied.findOne({user: userId, jobApplied: JobId});
        if(!isJobApplied) {
            const newJobApplication = await JobApplied.create({
                user: userId,
                jobApplied: JobId,
                status: "Apply"
            });
            job.applicants.push(userId);
            await job.save();
            return res.status(201).json({
                "message": "Job applied successfully.",
                "data": newJobApplication
            })
        }
        return res.status(400).json({
            "message": "you already applied this job"
        })
    } catch (error) {
        res.status(400).json({
            "message": error.message
        })
    }
}


export const getFeedForLoggedUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const FollwingTo = await Following.findOne({user: userId});
        if(!FollwingTo) {
            return res.status(400).json({
                "message": "Follow others to show feed"
            });
        }
        const loggedinUserFollowingTo = FollwingTo.following;
        let jobsPostedByTheFollowingToUsers = await Job.find({user: {$in: loggedinUserFollowingTo}}).select("_id");
        jobsPostedByTheFollowingToUsers = jobsPostedByTheFollowingToUsers?.map((id)=>{
            return id._id;
        })
        const jobsAppliedByTheLoggedInUser = await JobApplied.find({user:userId});
        const jobIdsAppliedByTheLoggedInUser = jobsAppliedByTheLoggedInUser.map((jobsApllied)=>{
            return jobsApllied.jobApplied;
        })

        jobsPostedByTheFollowingToUsers = await Job.find({user: {$in: loggedinUserFollowingTo}, _id:{$nin: jobIdsAppliedByTheLoggedInUser}})
        return res.status(200).json({
            "message": "Fetched feed for loggedin user successfully",
            "data": jobsPostedByTheFollowingToUsers
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}


export const exploreJobs = async (req, res) => {
    try {
        const userId = req.user._id;
        const jobsAppliedByTheLoggedInUser = await JobApplied.find({user:userId});
        const jobIdsAppliedByTheLoggedInUser = jobsAppliedByTheLoggedInUser.map((jobsApllied)=>{
            return jobsApllied.jobApplied;
        })

        const allJobsExceptLoggedUserPostedJobs = await Job.find({user: {$ne: userId}, _id:{$nin: jobIdsAppliedByTheLoggedInUser}})
        return res.status(200).json({
            "message": "jobs fetched successfully.", 
            "data": allJobsExceptLoggedUserPostedJobs
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}

export  const getJobApplication = async (req, res) => {
    try {
        const userId = req.user._id;
        const jobStatus = await JobApplied.find({user: userId});
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}

export const jobStatus = async (req, res) => {
    try {
        const userId = req.user._id;
        const { action, JobId, userAppliedId } = req.params;
        console.log({ action, JobId, userAppliedId });
        const ACCEPTED_ACTIONS = ["Accept", "Reject"];

        if(!action || !JobId || !userAppliedId || !action.trim() || !JobId.trim() || !userAppliedId.trim()) {
            return res.status(400).json({
                "message": "invalid action"
            })
        }
        if(!ACCEPTED_ACTIONS.includes(action)) {
            return res.status(400).json({
                "message": "invalid action"
            })
        }
        const postedJob = await Job.findById(JobId);
        if(!postedJob) {
            return res.status(200).json({
                "message": "job not found"
            })
        }
        const postedUserId = postedJob.user;
        if(userId.toString() === postedUserId.toString()) {
            const appliedJob = await JobApplied.findOne({jobApplied: JobId, user: userAppliedId});
            appliedJob.status = action;
            await appliedJob.save();
            return res.status(200).json({
                "message": `job ${action + "ed"} successfully`
            })
        }
        return res.status(400).json({
            "message": "Invalid request"
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}

export const jobApplications = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                "message": "Job not found"
            })
        }
        const applicants = await job.populate({
            path: "applicants",
            select: ["fullName", "email", "_id"]
        })

        if(applicants.applicants.length === 0) {
            return res.status(200).json({
                "message": "No applications found"
            });
        }
        return res.status(200).json({
            "message": "Applications found successfully",
            "data": applicants
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.messaage
        })
    }
}

export const LoggedUserAppliedJobs = async (req, res) => {
    try {
        const userId = req.user._id;
        const appliedJobs = await JobApplied.find({user: userId}).populate({
            path:"jobApplied"
        });
        if(!appliedJobs) {
            return res.status(200).json({
                "message": "you applied no jobs"
            })
        }
        return res.status(200).json({
            "message": "Applied jobs fetched successfully",
            "data": appliedJobs
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.messaage
        })
    }
}

export const getJobApplicants = async (req, res) => {
    try {
        const { jobId } = req.params;
        const applicants = await JobApplied.find({jobApplied: jobId, status: "Apply"}).populate({
            path:"user",
            select:"-password"
        });
        return res.json({
            "message": "Applicants fetched successfully",
            "data": applicants
        });
    } catch (error) {
        return res.status(400).json({
            "message": error.messaage
        })
    }
}