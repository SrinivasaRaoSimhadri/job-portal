import Address from "../models/Address.js";
import { validateAddressData } from "../utils/validation.js";

export const address = async (req, res) => {
    try {
        validateAddressData(req);
        const userId = req.user._id;
        const isAddressPresent = await Address.findOne({user: userId});
        if(isAddressPresent) {
            return res.status(400).json({
                "message": "You already added address"
            })
        }
        const {
            street,
            city,
            state,
            country,
            postalCode
        } = req.body;
        const userAddress = new Address({
            user: userId,
            street,
            city,
            state,
            country,
            postalCode
        })
        await userAddress.save();
        return res.status(200).json({
            "message": "Address saved successfully",
            "data": userAddress
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}

export const editAddress = async (req, res) => {
    try {
        validateAddressData(req);
        const userId = req.user._id;
        const {
            street,
            city,
            state,
            country,
            postalCode
        } = req.body;
        const userAddress = await Address.findOneAndUpdate(
            { user: userId},
            { street, city, state, country, postalCode },
            { new: true, runValidators: true}
        );
        if(!userAddress) {
            return res.status(404).json({
                "message": "Add address to edit"
            })
        }
        return res.status(200).json({
            "message": "Address edited successfully",
            "data": userAddress
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}

export const getAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const address = await Address.findOne({user: userId});
        if(!address) {
            return res.status(404).json({
                "message": "adress not found"
            })
        }
        return res.status(200).json({
            "message": "Address fetched successfully",
            "data": address
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}