import { useLocation } from "react-router-dom";
import Jobs from "./jobs";
import { BASE_URL } from "../utils/Constants";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

const JobsApplied = () => {
    const location = useLocation();
    const path = location.pathname;
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [feed, setFeed] = useState([]);
    const getLoggedUserAppliedJobs = async () => {
        try {
            const response = await fetch(BASE_URL + "/jobs/appliedJobs",{
                credentials: "include"
            })
            if(!response.ok) {
                setError(true);
                throw new Error("An error occured in fetching the jobs");
            }
            let data = await response.json();
            console.log("data data: ",data.data);
            setFeed(data.data);
        } catch (error) {
            setErrorMessage(error.message);
            setError(true);
        }
    }

    useEffect(()=> {
        getLoggedUserAppliedJobs();
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
                        <div key={job._id} className="flex justify-center my-4">
                            <div  className="flex items-center justify-between gap-2  bg-gray-900 p-4 min-w-[1100px] rounded-md hover:scale-105 duration-300">
                                <div>
                                    <img src={job?.jobApplied?.companyLogo} width={200}/>
                                </div>
                                <div>
                                    <div className="flex gap-2">
                                        <h1 className="font-semibold">Role: </h1>
                                        <h1>{job?.jobApplied?.title}</h1>
                                    </div>
                                    <div className="flex gap-2">
                                        <h1 className="font-semibold">Job description:  </h1>
                                        <h1>{job?.jobApplied?.jobDescription}</h1>
                                    </div>
                                    <div className="flex gap-2">
                                        <h1 className="font-semibold">Location:   </h1>
                                        <h1>{job?.jobApplied?.location}</h1>
                                    </div>
                                    <div className="flex gap-2">
                                        <h1 className="font-semibold">Skills: </h1>
                                        <h1>{job?.jobApplied?.skills?.join(" ")}</h1>
                                    </div>
                                    <div className="flex gap-2">
                                        <h1 className="font-semibold">Salary:  </h1>
                                        <h1>{job?.jobApplied?.salary}</h1>
                                    </div>
                                    <div className="flex gap-2">
                                        <h1 className="font-semibold">Employment Type:  </h1>
                                        <h1>{job?.jobApplied?.employmentType}</h1>
                                    </div>
                                </div>
                                <div className="flex flex-col h-full justify-between py-3">
                                    <div className="flex gap-2">
                                        <h1>{job?.jobApplied?.applicants.length}</h1>
                                        <h1>applicants</h1>
                                    </div>
                                    <h1>{job.status +"ed"}</h1>
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
export default JobsApplied;