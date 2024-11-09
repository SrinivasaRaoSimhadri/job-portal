import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import { removeUser } from "../store/userSlice";
const NavBar = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store)=>store.user);
    console.log("user", user);
    const location = useLocation();
    const path = location.pathname;

    const logoutUser = async () => {
        try {
            const response = await fetch(BASE_URL + "/auth/logout", {
                method: "POST",
                credentials: "include"
            })
            if(response.ok) {
                dispatch(removeUser());
                return navigate("/");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="flex justify-between items-center bg-gray-900 text-[20px] py-4 px-6 ">
            <div className="flex gap-10">
                {
                    user && <div 
                        className={`${path === `/profile/${user._id}` || "/profile/edit" ?"bg-gray-950 p-2 rounded-md" : ""} cursor-pointer`}
                        onClick={()=>navigate(`/profile/${user._id}`)}
                    >
                        Profile
                    </div>
                }
            </div>
            <div className="flex gap-14 items-center">
                {
                    user && <div 
                        className={`${path === "/feed"?"bg-gray-950 p-2 rounded-md" : ""} cursor-pointer`}
                        onClick={()=>navigate("/feed")}
                    >
                        Home
                    </div>
                }
                {
                    user && <div
                        className={`${path === "/user/exploreusers"?"bg-gray-950 p-2 rounded-md" : ""} cursor-pointer`}
                        onClick={()=>navigate("/user/exploreusers")}
                    >
                        Follow
                    </div>
                }
                {
                    user && <div 
                        className={`${path === "/user/followers"?"bg-gray-950 p-2 rounded-md" : ""} cursor-pointer`}
                        onClick={()=>navigate("/user/followers")}
                    >
                        Followers
                    </div>
                }
                {
                    user && <div 
                        className={`${path === "/user/following"?"bg-gray-950 p-2 rounded-md" : ""} cursor-pointer`}
                        onClick={()=>navigate("/user/following")}
                    >
                        Following
                    </div>
                }
                {
                    user && <div 
                        className={`${path.split("/")[1]=== "jobs"?"bg-gray-950 p-2 rounded-md" : ""} cursor-pointer`}
                        onClick={()=>navigate("/jobs/loggedUser/jobs")}>
                        Jobs
                    </div>
                }
                {
                    user && <div
                        className="cursor-pointer"
                        onClick={()=>logoutUser()}
                    >
                        LogOut
                    </div>
                }
                {
                    !user && <div
                        className="cursor-pointer"
                        onClick={()=>navigate("/auth/login")}
                    >
                        Login
                    </div>
                }
                {
                    !user && <div
                        className="cursor-pointer"
                        onClick={()=>navigate("/auth/signup")}
                    >
                        Register
                    </div>
                }
            </div>
        </div>
    )
}
export default NavBar;