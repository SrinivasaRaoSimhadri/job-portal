import Certifications from "../models/Certificate.js";
import { validateCertificateData } from "../utils/validation.js";

export const certificate = async (req, res) => {
    try {
        validateCertificateData(req);
        const { certificationName, certificateUrl } = req.body;
        const userId = req.user._id;
        const newCertificate = await Certifications.create({
            user: userId,
            certificationName,
            certificateUrl
        })
        return res.status(200).json({
            "message": "certificate posted successfully",
            "data": newCertificate
        }) 
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}

export const deleteCertificate = async (req, res) => {
    try {
        const userId = req.user._id;
        const { certificateId } = req.params;
        const certificate = await Certifications.findOneAndDelete({user: userId, _id: certificateId});
        if(!certificate) {
            return res.status(400).json({
                "message": "Certificate not found"
            })
        }
        return res.status(201).json({
            "message": "Certificate deleted successfully"
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}

export const getAllCertificates = async (req, res) => {
    try {
        const userId = req.user._id;
        const certificates = await Certifications.find({user: userId});
        if(!certificates) {
            return res.status(400).json({
                "message": "No certificated found"
            })
        } 
        return res.status(200).json({
            "message": "Certificated found successfully",
            "data": certificates
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}