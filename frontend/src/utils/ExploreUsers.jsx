import { useEffect, useState } from "react";
import { BASE_URL } from "./Constants";
import { useNavigate } from "react-router-dom";

const ExploreUsers = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const getUsers = async () =>{
        try {
            const response = await fetch(BASE_URL + "/user/exploreusers",{
                credentials:"include"
            });
            const data = await response.json();
            if(!response.ok) {
                throw new Error("An error occured in feteching the user");
            }
            setUsers(data?.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const Follow = async (id) =>{
        try {
            const response = await fetch(BASE_URL + `/user/follow/${id}`,{
                method: "POST",
                credentials: "include"
            })
            if(response.ok) {
                setUsers(users.filter((user)=>{
                    return user._id != id;
                }))
            }
        } catch (error) { 
            console.log(error.message);
        }
    }
    useEffect(()=>{
        getUsers();
    },[]);

    if(users.length === 0) {
        return <h1 className="bg-red-500 p-3 mx-auto rounded-md max-w-[500px] text-center mt-40">No users to show</h1>
    }

    return (
        <div className="flex flex-col mt-4 items-center justify-center">
            {
                users?.map((user) => {
                    return (
                        <div 
                            className="flex items-center justify-between  gap-4 text-xl my-3 bg-gray-900 p-3 rounded-md cursor-pointer hover:scale-105 duration-300 min-w-[500px]" 
                            key = {user._id}
                        >
                            <div className="flex flex-col gap-2" onClick={()=> navigate(`/profile/${user._id}`)}>
                                <div className="flex gap-3">
                                    <h1 className="font-semibold">Name: </h1>
                                    <h1>{user.fullName}</h1>
                                </div>
                                <div className="flex gap-3">
                                    <h1 className="font-semibold">Email: </h1>
                                    <h1>{user.email}</h1>
                                </div>
                            </div>
                            <div>
                                <button 
                                    className="bg-gray-600 p-2 rounded-md"
                                    onClick={()=>Follow(user._id)}
                                >
                                    Follow
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ExploreUsers;