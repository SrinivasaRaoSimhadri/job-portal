import mongoose from "mongoose";
const followingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "User"
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    }
},{
    timestamps: true
});

const Following = mongoose.models.Following || mongoose.model("Following", followingSchema);
export default Following;