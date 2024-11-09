import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { BASE_URL } from "./Constants";
import { useEffect, useState } from "react";

const Feed = ( {error, errorMessage, feed, flag } ) => {

    const user = useSelector((store)=>store.user);
    
    const [updatingFeed, setUpdatingFeed] = useState(feed);
    useEffect(() => {
    setUpdatingFeed(feed);
    }, [feed]);


    const ApplyJob = async (id)=> {
        try {
            const response = await fetch(BASE_URL + `/jobs/apply/${id}`,{
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include"
            })
            setUpdatingFeed(updatingFeed.filter((job)=>{return job._id != id;}));
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            {
                error && (
                    <h1 className="bg-red-500 p-3 mx-auto rounded-md max-w-[500px] text-center mt-40">{errorMessage}</h1>
                )
            }
            {
                !error && updatingFeed?.map((job) => {
                    return (
                        <div key={job._id} className="flex justify-center my-4">
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
                                    {
                                        user && flag && 
                                        <button 
                                            className="bg-slate-500 p-3 text-white rounded-md"
                                            onClick={()=>ApplyJob(job._id)}
                                        >
                                            Apply
                                        </button>
                                    }
                                    <h1>{formatDistanceToNow(job.createdAt) + " ago"}</h1>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Feed;