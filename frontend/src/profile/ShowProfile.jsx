import { useLocation, useParams } from "react-router-dom";
import ProfileBar from "./ProfileBar.jsx";
import { BASE_URL } from "../utils/Constants";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ShowProfile = () => {
    const location = useLocation();
    const path = location.pathname;
    const id = path.split("/")[2];
    const [userProfile, setUserProfile] = useState(null);

    const getProfile = async () => {
        try {
            const response = await fetch(BASE_URL + `/profile/${id}`,{
                credentials: "include"
            })
            const data = await response.json();
            console.log("data.data", data.data);
            setUserProfile(data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=> {
        getProfile();
    },[path]);

    return (
        <div className="flex flex-col items-center justify-center">
            <div>
                <ProfileBar path={path}/>
                <div className="flex flex-col items-center gap-6 mt-10">
                    <div>
                        {
                            userProfile?.profile && <img src={userProfile?.profile?.profilePic } height={300} width={300} className="rounded-full"/>
                        }
                    </div>
                    <div className="flex gap-10 bg-gray-600 p-3 rounded-md">
                        <h1>{userProfile?.user?.fullName}</h1>
                        <h1>||</h1>
                        <h1>{userProfile?.user?.email}</h1>
                        {
                           userProfile?.profile && ( <div className="flex">
                                <h1>||</h1>
                                <h1 className="ml-4">{userProfile?.profile?.contact}</h1>
                           </div>)
                        }
                        {
                            userProfile?.profile && ( <div className="flex">
                                <h1>||</h1>
                                <h1 className="ml-4">{userProfile?.profile?.skills.join(" ")}</h1>
                           </div>)
                        }
                        
                    </div>
                </div>
                {
                    userProfile?.experience?.length >=1 && (
                        <div className="flex flex-col bg-gray-600 my-5 rounded-md px-4">
                        <h1 className="mt-3">Experience: </h1>
                        {
                            userProfile?.experience?.map((experience)=>{
                                return (
                                    <div key={experience._id} className="flex flex-col items-center justify-center my-3 bg-gray-700 p-3 rounded-md">
                                        <div className="flex items-center gap-2">
                                            <h1>company: </h1>
                                            <h1>{experience.company}</h1>
                                        </div>
                                        <div className="flex items-center  gap-2">
                                            <h1>jobTitle: </h1>
                                            <h1>{experience.jobTitle}</h1>
                                        </div>
                                        <div className="flex items-center  gap-2">
                                            <h1>location: </h1>
                                            <h1>{experience.location}</h1>
                                        </div>
                                        <div className="flex items-center  gap-2">
                                            <h1>responsibilities: </h1>
                                            <h1>{experience.responsibilities}</h1>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <h1>startDate: </h1>
                                            <h1>{experience.startDate}</h1>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <h1>endDate: </h1>
                                            <h1>{experience.endDate}</h1>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    )
                }

                {
                    userProfile?.certifications?.length >=1 && (
                        <div className="flex flex-col bg-gray-600 my-5 rounded-md px-4">
                        <h1 className="mt-3">Certifications: </h1>
                        {
                            userProfile?.certifications?.map((certificate)=>{
                                return (
                                    <div key={certificate._id} className="flex flex-col items-center justify-center my-3 bg-gray-700 p-3 rounded-md">
                                        <div className="flex items-center gap-2">
                                            <img src ={certificate.certificateUrl} width={400}/>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <h1>{certificate.certificationName}</h1>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    )
                }
                {
                    userProfile?.address && 
                    <div className="flex flex-col bg-gray-600 my-5 rounded-md px-4">
                        <h1 className="mt-3">Address: </h1>
                        <div className="flex flex-col items-center justify-center my-3 bg-gray-700 p-3 rounded-md">
                            <div className="flex items-center gap-2">
                                <h1>Street: </h1>
                                <h1>{ userProfile?.address?.street}</h1>
                            </div>
                            <div className="flex items-center gap-2">
                                <h1>City: </h1>
                                <h1>{ userProfile?.address?.city}</h1>
                            </div><div className="flex items-center gap-2">
                                <h1>State: </h1>
                                <h1>{ userProfile?.address?.state}</h1>
                            </div><div className="flex items-center gap-2">
                                <h1>Country: </h1>
                                <h1>{ userProfile?.address?.country}</h1>
                            </div><div className="flex items-center gap-2">
                                <h1>PostalPin: </h1>
                                <h1>{ userProfile?.address?.postalCode}</h1>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
export default ShowProfile;