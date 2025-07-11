import { useEffect, useState } from "react";
import { BASE_URL } from "./Constants";
import { useNavigate } from "react-router-dom";

const Following = () => {
  const [followingToUser, setFollowingToUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getFollowing = async () => {
    try {
      const response = await fetch(BASE_URL + "/user/following", {
        credentials: "include",
      });
      const followingTo = await response.json();
      if (!response.ok) {
        throw new Error("An error occurred in fetching the user");
      }
      setFollowingToUser(followingTo?.data?.following || []);
    } catch (error) {
      console.log(error.message);
      setFollowingToUser([]);
    } finally {
      setLoading(false);
    }
  };

  const unFollow = async (id) => {
    try {
      const response = await fetch(BASE_URL + `/user/unfollow/${id}`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to unfollow user");
      }
      setFollowingToUser(followingToUser.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFollowing();
  }, []);

  if (loading) {
    return (
      <h1 className="text-white text-center mt-40">Loading your following list...</h1>
    );
  }

  if (followingToUser.length === 0) {
    return (
      <h1 className="bg-red-500 p-3 mx-auto rounded-md max-w-[500px] text-center mt-40">
        You are not following anyone.
      </h1>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      {followingToUser.map((followingUser) => (
        <div
          className="flex justify-between gap-4 text-xl my-3 bg-gray-900 p-3 rounded-md hover:scale-105 duration-300 min-w-[500px]"
          key={followingUser._id}
        >
          <div
            onClick={() => navigate(`/profile/${followingUser._id}`)}
            className="cursor-pointer"
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
          <button
            className="bg-red-300 p-2 rounded-md h-fit"
            onClick={() => unFollow(followingUser._id)}
          >
            Unfollow
          </button>
        </div>
      ))}
    </div>
  );
};

export default Following;
