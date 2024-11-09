import { useEffect, useState } from "react";
import { BASE_URL } from "./Constants";
import { useNavigate } from "react-router-dom";

const Following = () => {

    const [followingToUser, setFollowingToUser] = useState([]);
    const navigate = useNavigate();

    const getFollowing = async () =>{
        try {
            const response = await fetch(BASE_URL + "/user/following",{
                credentials:"include"
            });
            const followingTo = await response.json();
            if(!response.ok) {
                throw new Error("An error occured in feteching the user");
            }
            setFollowingToUser(followingTo?.data?.following);
        } catch (error) {
            console.log(error.message);
        }
    }

    const unFollow = async (id) => {
        try {
            const response = await fetch(BASE_URL + `/user/unfollow/${id}`,{
                method: "POST",
                credentials: "include"
            })
            setFollowingToUser(followingToUser.filter((user)=>{
                return user._id != id;
            }))
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(()=>{
        getFollowing();
    },[]);

    return (
        <div className="flex flex-col items-center justify-center mt-4">
            {
                followingToUser?.map((followingUser) => {
                    return (
                        <div 
                            className="flex justify-between  gap-4 text-xl my-3 bg-gray-900 p-3 rounded-md cursor-pointer hover:scale-105 duration-300 min-w-[500px]" 
                            key = {followingUser._id}
                        >
                            <div onClick={()=> navigate(`/profile/${followingUser._id}`)}>
                                <div className="flex gap-3">
                                    <h1 className="font-semibold">Name: </h1>
                                    <h1>{followingUser.fullName}</h1>
                                </div>
                                <div className="flex gap-3">
                                    <h1 className="font-semibold">Email: </h1>
                                    <h1>{followingUser.email}</h1>
                                </div>
                            </div>
                            <div>
                                <button 
                                    className="bg-red-300 p-2 rounded-md"
                                    onClick={()=>unFollow(followingUser._id)}>
                                    unFollow
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Following;