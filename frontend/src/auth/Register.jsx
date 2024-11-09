import { useState } from "react";
import { BASE_URL } from "../utils/Constants";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    
    const handleRegister = async () => {
        try {
            const response = await fetch(BASE_URL + "/auth/signup",{
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({fullName, email, password, confirmPassword})
            })
            const data = await response.json();
            setError(true);
            if(response.ok) {
                setErrorMessage("SignedUp successfully");
            }
            setErrorMessage(data.message);
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
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

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col gap-10 bg-gray-900 py-10 px-6 rounded-lg">
                <h1 className="text-center font-semibold">signUp</h1>
                <input 
                    type= "text" 
                    placeholder= "Name"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={fullName}
                    onChange={(event) => hadleInput(setFullName)(event)}
                />
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
                <input 
                    type= "password"
                    placeholder= "Confirm Password"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={confirmPassword}
                    onChange={(event) => hadleInput(setConfirmPassword)(event)}
                />
                {
                    error && (
                        <div className="flex flex-col gap-3">
                            <h1 className="bg-red-500 p-3 mx-auto rounded-md text-white">{errorMessage}</h1>
                            <button 
                                onClick={() => navigate("/auth/login")}
                                className="bg-gray-950 p-3 mx-auto rounded-md"
                            >
                                Login
                            </button>
                        </div>
                    )
                }
                {
                    !error && <button
                        onClick={()=>handleRegister()}
                        className="bg-gray-950 p-3 mx-auto rounded-md"
                    >
                        signUp
                    </button>
                }
            </div>
        </div>
    )
}
export default Register;