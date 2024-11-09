import mongoose from "mongoose";
import validator from "validator";
const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true
    },
    profilePic: {
        type: String,
        required: true,
        default: "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars.png",
        validate: {
            validator: function(value) {
                return validator.isURL(value);
            },
            message: "Enter a valid profile URL"
        }
    },
    skills: {
        type: [String],
        required: true,
        validate: [ 
            {
                validator: function(value) {
                    return value.length >= 3
                },
                message: "Atleat 3 skills are required"
            },
            {
                validator: function(value) {
                    return value.every((skill) => skill.trim().length > 0);
                },
                message: "Mention a valid skill"
            }
        ]
    },
    contact: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[0-9]{10}$/.test(value);
            },
            message: "Invalid mobile number"
        }
    }
},{
    timestamps: true
});

const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema);
export default Profile;