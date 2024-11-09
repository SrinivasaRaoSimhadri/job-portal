import mongoose from "mongoose";
const FollowerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true,
        ref: "User"
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    }
},{
    timestamps: true
});

const Followers = mongoose.models.Followers || mongoose.model("Followers", FollowerSchema);
export default Followers;