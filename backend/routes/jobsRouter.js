import express from "express";
import { 
    exploreJobs, 
    postJob, 
    getJob, 
    applyJob, 
    loggedUserPostedJobs, 
    getFeedForLoggedUser,
    jobStatus,
    jobApplications,
    getJobs,
    LoggedUserAppliedJobs,
    getJobApplication,
    getJobApplicants 
} from "../controllers/jobControllers.js";

const router = express.Router();

router.post("/:JobId/:action/:userAppliedId", jobStatus);
router.get("/jobApplicants/:jobId", getJobApplicants);
router.get("/application", getJobApplication);
router.get("/appliedJobs", LoggedUserAppliedJobs);
router.get("/jobs", getJobs);
router.get("/explore", exploreJobs);
router.get("/loggedUser/jobs", loggedUserPostedJobs);
router.get("/feed", getFeedForLoggedUser);
router.post("/post-job", postJob);
router.get("/applications/:jobId", jobApplications);
router.post("/apply/:JobId", applyJob);
router.get("/:JobId", getJob);

export default router;