import mongoose from "mongoose";

const followingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ]
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite error during hot reload or repeated imports
const Following = mongoose.models.Following || mongoose.model("Following", followingSchema);
export default Following;
