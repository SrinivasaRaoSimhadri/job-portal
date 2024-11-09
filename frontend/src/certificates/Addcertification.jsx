import { useState } from "react";
import { BASE_URL } from "../utils/Constants";

const Addcertification = () => {

    const [addCertification, setAddCertification] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [certificationName, setCertificationName] = useState("");
    const [certificateUrl, setCertificateUrl] = useState("");
    const [certificateInfo, setCertificateInfo] = useState(null);

    const getAllExperience = async () => {
        try {
            const response = await fetch(BASE_URL + "/certficate", {
                credentials: "include"
            })
            const data = await response.json();
            if(!response.ok) {
                return;
            }
            setCertificateInfo(data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const hadleInput = (setter) => {
        return (event) => {
            setter(event.target.value);
            if(error) {
                setError(false);
                setErrorMessage("");
            }
        }
    }

    const handleCertificate = async () => {
        try {
            const response  = await fetch(BASE_URL + "/certficate/post",{
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    certificationName,
                    certificateUrl
                }),
                credentials: "include"
            })
            const data = await response.json();
            setError(true);
            setErrorMessage(data.message);
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteCertificate =  async (_id) => {
        try {
            const response = await fetch(BASE_URL + `/certficate/delete/${_id}`,{
                method:"DELETE",
                credentials: "include"
            })
            if(response.ok) {
                let updatedcerti = certificateInfo.filter((exp)=>{
                    return exp._id != _id;
                })
                setCertificateInfo(updatedcerti);
            }
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }
     useState(()=>{
        getAllExperience();
    },[]);

    if(!addCertification) {
        return (
            <div 
                className="min-w-[500px] bg-gray-600 p-3 rounded-md text-center cursor-pointer"
                onClick={()=>setAddCertification(true)}
            >
                Add Certificate
            </div>
        )
    }

    return (
        <div className="min-w-[500px] max-w-[500px] flex items-center justify-center">
            <div className="min-w-[500px]  flex flex-col gap-10 bg-gray-900 py-10 px-6 rounded-lg">
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold">Add Certificate</h1>
                    <button onClick={()=>setAddCertification(false)} className="font-semibold bg-gray-600 p-3 rounded-md">Cancel</button>
                </div>
                <input 
                    type= "text" 
                    placeholder= "Certificate Name"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={certificationName}
                    onChange={(event) => hadleInput(setCertificationName)(event)}
                />
                <input 
                    type= "text"
                    placeholder= "Certificate Url"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={certificateUrl}
                    onChange={(event) => hadleInput(setCertificateUrl)(event)}
                />
                {
                    error && (
                        <h1 className="bg-red-500 p-3 mx-auto rounded-md">{errorMessage}</h1>
                    )
                }
                <button
                    onClick={()=>handleCertificate()}
                    className="bg-gray-950 p-3 mx-auto rounded-md"
                >
                    Add Certificate
                </button>
                <div className="flex flex-col bg-gray-600 my-5 rounded-md px-4">
                    <h1 className="mt-3">Certificates: </h1>
                    {
                        certificateInfo?.map((certificate)=>{
                            return (
                                <div key={certificate._id} className="relative flex my-3 bg-gray-700 p-3 rounded-md">
                                    <button 
                                        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                                        onClick={()=>deleteCertificate(certificate._id)}
                                    >
                                        Delete
                                    </button>
                                    <div className="flex items-start">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h1>Certificate Name: </h1>
                                                <h1>{certificate.certificationName}</h1>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h1>Certificate Url: </h1>
                                                <h1>{certificate.certificateUrl}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )


}
export default Addcertification;