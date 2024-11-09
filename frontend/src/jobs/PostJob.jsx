import { useLocation } from "react-router-dom";
import Jobs from "./jobs";
import { useState } from "react";
import { BASE_URL } from "../utils/Constants";

const PostJob = () => {

    const [error, setError] = useState(false);
    const [title, setTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [location, setLocation] = useState("");
    const [skills, setSkills] = useState("");
    const [salary, setSalary] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [companyLogo, setCompanyLogo] = useState("");
    const locationUrl = useLocation();
    const path = locationUrl.pathname;

    const hadleInput = (setter) => {
        return (event) => {
            setter(event.target.value);
            if(error) {
                setError(false);
                setErrorMessage("");
            }
        }
    }

    const handlePostJob = async () => {
        try {
            const response = await fetch(BASE_URL + "/jobs/post-job",{
                method:"POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    companyLogo,
                    title,
                    jobDescription,
                    companyName,
                    location,
                    skills: skills.split(" "),
                    salary,
                    employmentType
                }),
                credentials: "include"
            })
            const data = await response.json();
            setError(true);
            setErrorMessage(data.message);
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }

    return (
        <div>
            <Jobs path={path}/>
            <div className="flex items-center justify-center my-5"> 
                <div className="flex flex-col gap-10 bg-gray-900 py-10 px-6 rounded-lg">
                    <h1 className="text-center font-semibold">Post Job</h1>
                    <input 
                        type= "text"
                        placeholder= "Logo url"
                        className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                        value={companyLogo}
                        onChange={(event) => hadleInput(setCompanyLogo)(event)}
                    />
                    <input 
                        type= "text" 
                        placeholder= "job title"
                        className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                        value={title}
                        onChange={(event) => hadleInput(setTitle)(event)}
                    />
                    <input 
                        type= "text" 
                        placeholder= "job description"
                        className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                        value={jobDescription}
                        onChange={(event) => hadleInput(setJobDescription)(event)}
                    />
                    <input 
                        type= "text"
                        placeholder= "company name"
                        className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                        value={companyName}
                        onChange={(event) => hadleInput(setCompanyName)(event)}
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
                        placeholder= "skills - space seperated"
                        className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                        value={skills}
                        onChange={(event) => hadleInput(setSkills)(event)}
                    />
                    <input 
                        type= "text"
                        placeholder= "salary"
                        className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                        value={salary}
                        onChange={(event) => hadleInput(setSalary)(event)}
                    />
                    <input 
                        type= "text"
                        placeholder= "employment type"
                        className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                        value={employmentType}
                        onChange={(event) => hadleInput(setEmploymentType)(event)}
                    />
                    {
                        error && (
                            <h1 className="bg-red-500 p-3 mx-auto rounded-md max-w-[500px] text-center mt-5">{errorMessage}</h1>
                        )
                    }
                    {
                        !error && <button
                            onClick={()=>handlePostJob()}
                            className="bg-gray-950 p-3 mx-auto rounded-md"
                        >
                            PostJob
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}
export default PostJob;