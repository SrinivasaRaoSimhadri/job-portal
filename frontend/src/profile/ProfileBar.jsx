import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom";
const ProfileBar = ( {path} ) => {
    const user = useSelector((store)=>store.user);
    const location = useLocation();
    const path1 = location.pathname;
    const id = path1.split("/")[2];
    return (
        <div className="flex gap-5 mt-4 text-[20px] items-center justify-center">
            <div className="flex gap-8 p-2">
                <Link 
                    to={`/profile/${user?._id}`}
                    className={`${path.startsWith("/profile/") && path !== "/profile/edit"?"border-b-2":""}`}
                >
                    Profile
                </Link>
                {
                    id === user?._id && 
                    <Link 
                        to="/profile/edit"
                        className={`${path==="/profile/edit"?"border-b-2":""}`}
                    >
                        Edit
                    </Link>
                }
            </div>
        </div>
    )
}

export default ProfileBar;