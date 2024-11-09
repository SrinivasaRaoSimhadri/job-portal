import { useNavigate } from "react-router-dom";

const Jobs = ( {path} ) => {
    const navigate = useNavigate();
    return (
        <div className="flex gap-5 mt-4 text-[20px] items-center justify-center">
            <div className="flex gap-8 p-2">
                <button 
                    className={`${path === "/jobs/loggedUser/jobs"? "border-b-2": ""}`}
                    onClick={()=>navigate("/jobs/loggedUser/jobs")}
                >
                    Jobs posted
                </button>
                <button 
                    className={`${path === "/jobs/appliedJobs"? "border-b-2": ""}`}
                    onClick={()=>navigate("/jobs/appliedJobs")}
                >
                    Jobs Applied
                </button>
                <button 
                    className={`${path === "/jobs/explore"? "border-b-2": ""}`}
                    onClick={()=>navigate("/jobs/explore")}
                >
                    Explore Jobs
                </button>
                <button 
                    className={`${path === "/jobs/post-job"? "border-b-2": ""}`}
                    onClick={()=>navigate("/jobs/post-job")}
                >
                    Post Job
                </button>
            </div>
        </div>
    )
}
export default Jobs;