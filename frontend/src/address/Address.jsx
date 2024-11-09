import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/Constants";

const Address = () => {

    const [error, setError] = useState(false);
    const [address, setAddress] = useState(true);
    const [buttonFlag, setButtonFlag] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity]= useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const hadleInput = (setter) => {
        return (event) => {
            setter(event.target.value);
            if(error) {
                setError(false);
                setErrorMessage("");
            }
        }
    }
    
    const handleAddAddress = async () => {
        try {
            const response = await fetch(BASE_URL + "/address" + `${buttonFlag?"":"/edit"}`,{
                method: buttonFlag ?"POST":"PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    street,
                    city,
                    state,
                    country,
                    postalCode
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

    const getAddress = async () => {
        try {
            const response = await fetch(BASE_URL + "/address",{
                credentials:"include"
            });
            const data = await response.json();
            if(response.status === 404) {
                setButtonFlag(true);
                return;
            }
            setButtonFlag(false);
            setStreet(data.data.street);
            setCity(data.data.city);
            setState(data.data.state);
            setCountry(data.data.country);
            setPostalCode(data.data.postalCode);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=> {
        getAddress();
    },[]);

    if(address) {
        return (
            <button
                onClick={()=>setAddress(false)}
                className="min-w-[500px] bg-gray-600 p-3 rounded-md text-center cursor-pointer"
            >
                address
            </button>
        )
    }

    return (
        <div className="flex items-center justify-center">
            <div className="min-w-[500px] max-w-[500px] flex flex-col gap-10 bg-gray-900 py-10 px-6 rounded-lg">
                <div className="flex justify-between items-center">
                    <h1 className="text-center font-semibold">Address</h1>
                    <button onClick={()=>setAddress(true)} className="font-semibold bg-gray-600 p-3 rounded-md">Cancel</button>
                </div>
                <input 
                    type= "text" 
                    placeholder= "street"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={street}
                    onChange={(event) => hadleInput(setStreet)(event)}
                />
                <input 
                    type= "text"
                    placeholder= "city"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={city}
                    onChange={(event) => hadleInput(setCity)(event)}
                />
                <input 
                    type= "text"
                    placeholder= "state"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={state}
                    onChange={(event) => hadleInput(setState)(event)}
                />
                <input 
                    type= "text"
                    placeholder= "country"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={country}
                    onChange={(event) => hadleInput(setCountry)(event)}
                />
                <input 
                    type= "text"
                    placeholder= "postaCode"
                    className= "bg-slate-500 min-w-[300px] p-3 rounded-md placeholder:text-white placeholder:font-semibold"
                    value={postalCode}
                    onChange={(event) => hadleInput(setPostalCode)(event)}
                />
                {
                    error && (
                        <h1 className="bg-red-500 p-3 mx-auto rounded-md">{errorMessage}</h1>
                    )
                }
                <button
                    onClick={()=>handleAddAddress()}
                    className="bg-gray-950 p-3 mx-auto rounded-md"
                >
                    {
                        buttonFlag && "Add address"
                    }
                    {
                        !buttonFlag && "Edit address"
                    }
                </button>
            </div>
        </div>
    )
}
export default Address;