import { useState } from "react";
import { BASE_URL } from "../utils/Constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const Login  = () => {

    const [email, setEmail] = useState("akhil@gmail.com");
    const [password, setPassword] = useState("JobPortal@123");
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const response = await fetch(BASE_URL + "/auth/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({email, password}),
                credentials: "include"
            })
            const data = await response.json();
            if(!response.ok) {
                setError(true);
                setErrorMessage(data.message);
            }
            
            // createdAt: "2024-10-30T14:12:31.367Z"
            // email: "srinu@gmail.com"
            // fullName: "srinu"
            // updatedAt: "2024-10-30T14:12:31.367Z"
            // _id:"67223ecf6da519f287d56e45"

            console.log("data.data",data.data);
            dispatch(addUser(data.data));
            setEmail("");
            setPassword("");
            return navigate("/feed");
        } catch (error) {
            setError(true);
            setErrorMessage(data?.message  || "Error occured");
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
    return  (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col gap-10 bg-gray-900 py-10 px-6 rounded-lg">
                <h1 className="text-center font-semibold">Login</h1>
                <input 
                    type= "text" 
                    placeholder= "Email"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={email}
                    onChange={(event) => hadleInput(setEmail)(event)}
                />
                <input 
                    type= "password"
                    placeholder= "Password"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={password}
                    onChange={(event) => hadleInput(setPassword)(event)}
                />
                {
                    error && (
                        <h1 className="bg-red-500 p-3 mx-auto rounded-md">{errorMessage}</h1>
                    )
                }
                <button
                    onClick={()=>handleLogin()}
                    className="bg-gray-950 p-3 mx-auto rounded-md"
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login;