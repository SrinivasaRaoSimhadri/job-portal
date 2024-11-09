import { useLocation } from "react-router-dom";
import ProfileBar from "./ProfileBar";
import Address from "../address/Address";
import AddExperience from "../experience/AddExperience.jsx";
import Addcertification from "../certificates/Addcertification.jsx";
import Profile from "./Profile.jsx";

const ProfileEdit = () => {
    const location = useLocation();
    const path = location.pathname;
    return (
        <div className="flex flex-col gap-5 items-center justify-center my-5">
            <ProfileBar path={path}/>
            <Address/>  
            <Profile/>
            <AddExperience/>
            <Addcertification/>
        </div>
    )
}
export default ProfileEdit;