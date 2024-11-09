import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userAuth from "./middlewares/userAuth.js";
import ConnectDB from "./config/connectDB.js";
import authRouter from "./routes/authRouter.js";
import profileRouter from "./routes/profileRouter.js";
import feedRouter from "./routes/jobsRouter.js";
import followRouter from "./routes/followRouter.js";
import addressRouter from "./routes/addressRouter.js";
import certificateRouter from "./routes/certificateRouter.js"
import experienceRouter from "./routes/experienceRouter.js";
import projectRouter from "./routes/projectRouter.js";
import { getJobs } from "./controllers/jobControllers.js";

const app = express();
dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/profile", userAuth, profileRouter);
app.use("/jobs/jobs", getJobs);
app.use("/jobs", userAuth, feedRouter);
app.use("/user", userAuth, followRouter);
app.use("/address", userAuth, addressRouter);
app.use("/certficate", userAuth, certificateRouter);
app.use("/experience", userAuth, experienceRouter);
app.use("/project", userAuth, projectRouter);



const start = async () => {
    try {
        await ConnectDB();
        app.listen(process.env.PORT, ()=>{
            console.log(`app is listening at port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();