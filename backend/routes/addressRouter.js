import express from "express";
import { address, editAddress, getAddress } from "../controllers/addressController.js";
const router = express();

router.post("/", address);
router.patch("/edit", editAddress);
router.get("/", getAddress);
export default router;