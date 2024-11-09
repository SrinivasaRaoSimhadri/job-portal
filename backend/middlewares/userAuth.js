import jwt from "jsonwebtoken";
import User from "../models/User.js";

const userAuth = async (req, res, next) =>{
    try {
        const { token } = req.cookies;
        if(!token) {
            throw new Error("Unauthorized");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decoded;
        const user = await User.findById(_id).select("-password");
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({"message": "Unauthorized"});
    }
}

export default userAuth;