import { useEffect, useState } from "react";
import { BASE_URL } from "./Constants";
import { useNavigate } from "react-router-dom";

const Followers = () => {
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);  // loading state
    const navigate = useNavigate();

    const getFollowers = async () => {
        try {
            const response = await fetch(BASE_URL + "/user/followers", {
                credentials: "include"
            });
            const followingTo = await response.json();

            if (!response.ok) {
                throw new Error("An error occurred in fetching the user");
            }

            setFollowers(followingTo?.data?.followers || []);
        } catch (error) {
            console.log(error.message);
            setFollowers([]);  // fallback to empty array
        } finally {
            setLoading(false);  // done loading
        }
    };

    useEffect(() => {
        getFollowers();
    }, []);

    // Show loading
    if (loading) {
        return (
            <h1 className="text-center mt-40 text-white">
                Loading followers...
            </h1>
        );
    }

    // Show message when no followers
    if (followers.length === 0) {
        return (
            <h1 className="bg-red-500 p-3 mx-auto rounded-md max-w-[500px] text-center mt-40">
                No followers to show
            </h1>
        );
    }

    // Show followers list
    return (
        <div className="flex flex-col items-center justify-center mt-4">
            {
                followers.map((followingUser) => (
                    <div
                        className="flex flex-col gap-4 text-xl my-3 bg-gray-900 p-3 rounded-md cursor-pointer hover:scale-105 duration-300 min-w-[500px]"
                        key={followingUser._id}
                        onClick={() => navigate(`/profile/${followingUser._id}`)}
                    >
                        <div className="flex gap-3">
                            <h1 className="font-semibold">Name:</h1>
                            <h1>{followingUser.fullName}</h1>
                        </div>
                        <div className="flex gap-3">
                            <h1 className="font-semibold">Email:</h1>
                            <h1>{followingUser.email}</h1>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Followers;
