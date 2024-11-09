import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        min: 4,
        max: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value);
            },
            message: "Enter valid EmailId"
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return validator.isStrongPassword(value);
            },
            message: "Enter strong password"
        }
    }
},{
    timestamps: true
})

userSchema.methods.isValidPassword = async function(userInputPassword) {
    const user = this;
    return await bcrypt.compare(userInputPassword, user.password);
}

userSchema.methods.get_JWT = function() {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
    return token;
}

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;