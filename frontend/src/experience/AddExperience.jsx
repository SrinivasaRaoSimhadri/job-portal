import { useState } from "react";
import { BASE_URL } from "../utils/Constants";

const AddExperience = () => {

    const [addExperince, setAddExperience] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [responsibilities, setResponsibilities] = useState("");
    const [expInfo, setExpInfo] = useState(null); 

    const getAllExperience = async () => {
        try {
            const response = await fetch(BASE_URL + "/experience", {
                credentials: "include"
            })
            if(!response.ok) {
                setError(true);
                setErrorMessage("An error occured in fetching the experice");
                return;
            }
            const data = await response.json();
            setExpInfo(data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const hadleInput = (setter) => {
        return (event) => {
            setter(event.target.value);
            if(error) {
                setError(false);
                setErrorMessage("");
            }
        }
    }

    const handleExperience = async () => {
        try {
            const response  = await fetch(BASE_URL + "/experience/post",{
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    jobTitle,
                    company,
                    location,
                    startDate,
                    endDate,
                    responsibilities
                }),
                credentials: "include"
            })
            const data = await response.json();
            setError(true);
            setErrorMessage(data.message);
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteExperience =  async (_id) => {
        try {
            const response = await fetch(BASE_URL + `/experience/delete/${_id}`,{
                method:"DELETE",
                credentials: "include"
            })
            if(response.ok) {
                let updatedExp = expInfo.filter((exp)=>{
                    return exp._id != _id;
                })
                setExpInfo(updatedExp);
            }
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }
     useState(()=>{
        getAllExperience();
    },[]);

    if(!addExperince) {
        return (
            <div 
                className="min-w-[500px] bg-gray-600 p-3 rounded-md text-center cursor-pointer"
                onClick={()=>setAddExperience(true)}
            >
                Add Experience
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="min-w-[500px]  flex flex-col gap-10 bg-gray-900 py-10 px-6 rounded-lg">
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold">Add Experience</h1>
                    <button onClick={()=>setAddExperience(false)} className="font-semibold bg-gray-600 p-3 rounded-md">Cancel</button>
                </div>
                <input 
                    type= "text" 
                    placeholder= "job title"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={jobTitle}
                    onChange={(event) => hadleInput(setJobTitle)(event)}
                />
                <input 
                    type= "text"
                    placeholder= "comapny"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={company}
                    onChange={(event) => hadleInput(setCompany)(event)}
                />
                <input 
                    type= "text"
                    placeholder= "location"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={location}
                    onChange={(event) => hadleInput(setLocation)(event)}
                />
                <input 
                    type= "text"
                    placeholder= "start Date"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={startDate}
                    onChange={(event) => hadleInput(setStartDate)(event)}
                />
                <input 
                    type= "text"
                    placeholder= "end Date"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={endDate}
                    onChange={(event) => hadleInput(setEndDate)(event)}
                />
                <input 
                    type= "text"
                    placeholder= "responsibilities"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={responsibilities}
                    onChange={(event) => hadleInput(setResponsibilities)(event)}
                />
                {
                    error && (
                        <h1 className="bg-red-500 p-3 mx-auto rounded-md">{errorMessage}</h1>
                    )
                }
                <button
                    onClick={()=>handleExperience()}
                    className="bg-gray-950 p-3 mx-auto rounded-md"
                >
                    Add Experience
                </button>
                <div className="flex flex-col bg-gray-600 my-5 rounded-md px-4">
                    <h1 className="mt-3">Experience: </h1>
                    {
                        expInfo?.map((experience)=>{
                            return (
                                <div key={experience._id} className="relative flex my-3 bg-gray-700 p-3 rounded-md">
                                    <button 
                                        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                                        onClick={()=>deleteExperience(experience._id)}
                                    >
                                        Delete
                                    </button>
                                    <div className="flex items-start">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h1>Company:</h1>
                                                <h1>{experience.company}</h1>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h1>Job Title:</h1>
                                                <h1>{experience.jobTitle}</h1>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h1>Location:</h1>
                                                <h1>{experience.location}</h1>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h1>Responsibilities:</h1>
                                                <h1>{experience.responsibilities}</h1>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h1>Start Date:</h1>
                                                <h1>{experience.startDate}</h1>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h1>End Date:</h1>
                                                <h1>{experience.endDate}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )


}
export default AddExperience;