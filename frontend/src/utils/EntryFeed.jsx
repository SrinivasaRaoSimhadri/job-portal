import { useEffect, useState } from "react";
import { BASE_URL } from "./Constants";
import Feed from "./Feed";

const EntryFeed = () => {

    const [feed, setFeed] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(false);

    const getFeed = async ()=> {
        try {
            const response = await fetch(BASE_URL + "/jobs/jobs",{
                credentials: "include"
            })
            const data = await response.json();
            if(!response.ok) {
                setErrorMessage(data.message);
                setError(true);
            }
            setFeed(data.data);
        } catch (error) {
            setErrorMessage(error.message);
            setError(true);
        }
    }

    useEffect(()=> {
        getFeed();
    },[]);

    return (
        <Feed error= {error} errorMessage = {errorMessage} feed = {feed}/>
    )
}
export default EntryFeed;