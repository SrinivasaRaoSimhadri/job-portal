import { useLocation } from "react-router-dom";
import Jobs from "./jobs";
import { BASE_URL } from "../utils/Constants";
import { useState, useEffect } from "react"; // ✅ Fixed: added useEffect
import Feed from "../utils/Feed";

const ExploreJobs = () => {
    const location = useLocation();
    const path = location.pathname;

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(true); // ✅ Added loading state

    const getAllJobs = async () => {
        try {
            const response = await fetch(BASE_URL + "/jobs/explore", {
                credentials: "include"
            });
            if (!response.ok) {
                setError(true);
                throw new Error("An error occurred in fetching the jobs");
            }
            const data = await response.json();
            console.log(data);
            setFeed(data.data || []); // ✅ fallback to empty array
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        } finally {
            setLoading(false); // ✅ Done loading
        }
    };

    // ✅ Fixed: changed useState to useEffect
    useEffect(() => {
        getAllJobs();
    }, []);

    return (
        <div>
            <Jobs path={path} />

            {/* ✅ Show loading message */}
            {loading && (
                <h1 className="text-white text-center mt-40">
                    Loading jobs...
                </h1>
            )}

            {/* ✅ Show error message */}
            {!loading && error && (
                <h1 className="bg-red-500 p-3 mx-auto rounded-md max-w-[500px] text-center mt-40">
                    {errorMessage}
                </h1>
            )}

            {/* ✅ Message when no jobs available */}
            {!loading && !error && feed.length === 0 && (
                <h1 className="bg-red-500 p-3 mx-auto rounded-md max-w-[500px] text-center mt-40">
                    No jobs available to explore right now.
                </h1>
            )}

            {/* ✅ Render feed when available */}
            {!loading && !error && feed.length > 0 && (
                <Feed error={error} errorMessage={errorMessage} feed={feed} flag={true} />
            )}
        </div>
    );
};

export default ExploreJobs;
