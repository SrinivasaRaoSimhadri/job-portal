import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/Constants";
import { useSelector } from "react-redux";

const Profile = () => {

    const [error, setError] = useState(false);
    const [address, setAddress] = useState(true);
    const [buttonFlag, setButtonFlag] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [skills, setSkills] = useState("");
    const [contact, setContact] = useState("");

    const hadleInput = (setter) => {
        return (event) => {
            setter(event.target.value);
            if(error) {
                setError(false);
                setErrorMessage("");
            }
        }
    }
    
    const handleAddProfile = async () => {
        try {
            const response = await fetch(BASE_URL + "/profile" + `${buttonFlag?"/post":"/edit"}`,{
                method: buttonFlag ?"POST":"PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    profilePic,
                    skills: skills.split(" "),
                    contact
                }),
                credentials: "include"
            })
            const data = await response.json();
            setError(true);
            setErrorMessage(data?.message);
            setButtonFlag(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    const getProfile = async () => {
        try {
            const response = await fetch(BASE_URL + "/profile/loggedUserProfile",{
                credentials:"include"
            });
            
            if(response.status === 404) {
                setButtonFlag(true);
                return;
            }
            const data = await response.json();
            setButtonFlag(false);
            console.log(".data.data", data.data.contact);
            setContact(data.data.contact);
            setSkills(data.data.skills?.join(" "));
            setProfilePic(data.data.profilePic);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=> {
        getProfile();
    },[]);

    if(address) {
        return (
            <button
                onClick={()=>setAddress(false)}
                className="min-w-[500px] bg-gray-600 p-3 rounded-md text-center cursor-pointer"
            >
                Profile
            </button>
        )
    }

    return (
        <div className="flex items-center justify-center">
            <div className="min-w-[500px] max-w-[500px] flex flex-col gap-10 bg-gray-900 py-10 px-6 rounded-lg">
                <div className="flex justify-between items-center">
                    <h1 className="text-center font-semibold">Profile</h1>
                    <button onClick={()=>setAddress(true)} className="font-semibold bg-gray-600 p-3 rounded-md">Cancel</button>
                </div>
                <input 
                    type= "text" 
                    placeholder= "Profile pic URL"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={profilePic}
                    onChange={(event) => hadleInput(setProfilePic)(event)}
                />
                <input 
                    type= "text"
                    placeholder= "Skills - space seprated"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={skills}
                    onChange={(event) => hadleInput(setSkills)(event)}
                />
                <input 
                    type= "text"
                    placeholder= "Contact"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={contact}
                    onChange={(event) => hadleInput(setContact)(event)}
                />
                {
                    error && (
                        <h1 className="bg-red-500 p-3 mx-auto rounded-md">{errorMessage}</h1>
                    )
                }
                <button
                    onClick={()=>handleAddProfile()}
                    className="bg-gray-950 p-3 mx-auto rounded-md"
                >
                    {
                        buttonFlag && "Add Profile"
                    }
                    {
                        !buttonFlag && "Edit Profile"
                    }
                </button>
            </div>
        </div>
    )
}
export default Profile;