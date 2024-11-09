import { useLocation, useNavigate } from "react-router-dom";
import Jobs from "./jobs";
import { BASE_URL } from "../utils/Constants";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

const JobsPosted = () => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [feed, setFeed] = useState([]);
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    
    const getLoggedUserPostedJobs = async () => {
        try {
            const response = await fetch(BASE_URL + "/jobs/loggedUser/jobs", {
                credentials: "include"
            })
            const data = await response.json();
            if(!response.ok) {
                setError(true);
                throw new Error(data.message);
            }
            setFeed(data.data);
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
            console.log(error.message);
        }
    }

    useEffect(()=>{
        getLoggedUserPostedJobs();
    },[]);

    return (
        <div>
            <Jobs path={path}/>
            <div>
                {
                    error && (
                        <h1 className="bg-red-500 p-3 mx-auto rounded-md max-w-[500px] text-center mt-40">{errorMessage}</h1>
                    )
                }
                {
                    !error && feed?.map((job) => {
                        return (
                            <div 
                                key={job._id} 
                                className="flex justify-center my-4 cursor-pointer"
                                onClick={()=>navigate(`/jobs/applications/${job._id}`)}
                            >
                                <div  className="flex items-center justify-between gap-2  bg-gray-900 p-4 min-w-[1100px] rounded-md hover:scale-105 duration-300">
                                    <div>
                                        <img src={job.companyLogo} width={200}/>
                                    </div>
                                    <div>
                                        <div className="flex gap-2">
                                            <h1 className="font-semibold">Role: </h1>
                                            <h1>{job.title}</h1>
                                        </div>
                                        <div className="flex gap-2">
                                            <h1 className="font-semibold">Job description:  </h1>
                                            <h1>{job.jobDescription}</h1>
                                        </div>
                                        <div className="flex gap-2">
                                            <h1 className="font-semibold">Location:   </h1>
                                            <h1>{job.location}</h1>
                                        </div>
                                        <div className="flex gap-2">
                                            <h1 className="font-semibold">Skills: </h1>
                                            <h1>{job.skills?.join(" ")}</h1>
                                        </div>
                                        <div className="flex gap-2">
                                            <h1 className="font-semibold">Salary:  </h1>
                                            <h1>{job.salary}</h1>
                                        </div>
                                        <div className="flex gap-2">
                                            <h1 className="font-semibold">Employment Type:  </h1>
                                            <h1>{job.employmentType}</h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-col h-full justify-between py-3">
                                        <div className="flex gap-2">
                                            <h1>{job.applicants.length}</h1>
                                            <h1>applicants</h1>
                                        </div>
                                        <h1>{formatDistanceToNow(job.createdAt) + " ago"}</h1>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default JobsPosted;