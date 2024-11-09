import { useLocation } from "react-router-dom";
import Jobs from "./jobs";
import { BASE_URL } from "../utils/Constants";
import { useState } from "react";
import Feed from "../utils/Feed";

const ExploreJobs = () => {
    const location = useLocation();
    const path = location.pathname;

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [feed, setFeed] = useState([]);

    const getAllJobs = async () => {
        try {
            const response = await fetch(BASE_URL + "/jobs/explore",{
                credentials: "include"
            })
            if(!response.ok) {
                setError(true);
                throw new Error("An error occured in fetching the jobs");
            }
            const data = await response.json();
            console.log(data);
            setFeed(data.data);
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }

    useState(()=> {
        getAllJobs();
    },[]);

    return (
        <div>
            <Jobs path={path}/>
            <Feed error={error} errorMessage={errorMessage} feed={feed} flag={true} />
        </div>
    )
}
export default ExploreJobs;