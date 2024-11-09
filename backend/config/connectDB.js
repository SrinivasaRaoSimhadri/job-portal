import mongoose from "mongoose";

const ConnectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to database successfully");
}

export default ConnectDB;