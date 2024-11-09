import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BASE_URL } from "../utils/Constants";
import { addUser } from "../store/userSlice";
const Body = () => {

    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getUser = async () => {
        try {
            const response = await fetch( BASE_URL + "/profile",{
                credentials: "include"
            })
            if(response.ok) {
                let userDetails = await response.json();
                userDetails = userDetails.data
                console.log("userDetails: ",userDetails)
                dispatch(addUser(userDetails));
                return navigate("/feed");
            }
            return navigate("/");
        } catch (error) {
            console.log("an error is being raised");
        }
    }
    useEffect(()=> {
        if(!user) {
            getUser();
        } 
    },[]);
    
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <main className="flex-grow">
                <Outlet/>  
            </main>
            <Footer/>
        </div>
    )
}
export default Body;