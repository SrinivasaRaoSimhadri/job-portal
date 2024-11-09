import express from "express";
import { editProfile, getProfile, profile, getLoggedUser, LoggedUserProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/loggedUserProfile", LoggedUserProfile);
router.get("/:userId", getProfile);
router.get("/", getLoggedUser);
router.post("/post", profile);
router.patch("/edit", editProfile);

export default router;