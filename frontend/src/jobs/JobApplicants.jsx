import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/Constants";
import { useLocation, useNavigate } from "react-router-dom";

const JobApplicants = () => {

    const [applicants, setApplicatns] = useState(null);
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const [error, setError] = useState(false);


    // /:JobId/:action/:userAppliedId

    const jobStatus = async (action, id) => {
        try {
            console.log(`/${path.split("/")[3]}/${action}/${id}`);
            const response = await fetch(BASE_URL + `/jobs/${path.split("/")[3]}/${action}/${id}`,{
                method:"POST",
                headers:{
                    "Content-type": "application/json",
                },
                credentials:"include"
            })
            if(response.ok) {
                setApplicatns(applicants.filter((user)=>{
                    return user?.user?._id != id;
                }))
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const getApplicants  = async () => {
        try {
            const response = await fetch(BASE_URL + `/jobs/jobApplicants/${path.split("/")[3]}`,{
                credentials: "include"
            })
            const data = await response.json();
            if(data?.data?.length === 0) {
                setError(true);
            }
            setApplicatns(data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        getApplicants();
    },[]);

    if(error) {
        return (
            <h1 className="bg-red-500 p-3 mx-auto rounded-md max-w-[500px] text-center mt-40">No applicants</h1>
        )
    }
    return (
        <div className="flex flex-col items-center justify-center mt-4 text-white">
            {
                applicants?.map((user) => {
                    console.log("user in map:", user);
                    return (
                        <div 
                            className="flex justify-between gap-4 text-xl my-3 bg-gray-900 p-3 rounded-md cursor-pointer hover:scale-105 duration-300 min-w-[500px]" 
                            key = {user?.user?._id}
                        >
                            <div className="flex flex-col gap-2" onClick={()=> navigate(`/profile/${user?.user?._id}`)}>
                                <div className="flex gap-3">
                                    <h1 className="font-semibold">Name: </h1>
                                    <h1>{user?.user?.fullName}</h1>
                                </div>
                                <div className="flex gap-3">
                                    <h1 className="font-semibold">Email: </h1>
                                    <h1>{user?.user?.email}</h1>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <button 
                                    className="bg-green-300 p-1 rounded-md"
                                    onClick={()=> jobStatus("Accept", user?.user?._id)}
                                >
                                    Accept
                                </button>
                                <button 
                                    className="bg-red-300 p-1 rounded-md"
                                    onClick={()=> jobStatus("Reject", user?.user?._id)}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default JobApplicants;