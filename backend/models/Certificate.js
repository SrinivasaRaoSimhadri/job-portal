import mongoose from "mongoose";
import validator from "validator";

const certificateSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    certificationName: {
        type: String,
        required: true,
        trim: true
    },
    certificateUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return validator.isURL(value);
            },
            message: "Invalid certificate"
        }
    }
},{
    timestamps: true
})

const Certifications = mongoose.models.Certifications  || mongoose.model("Certifications", certificateSchema);
export default Certifications;