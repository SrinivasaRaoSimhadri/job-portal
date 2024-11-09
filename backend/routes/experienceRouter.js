import express from "express";
import { experience, deleteExperience, getAllExperience } from "../controllers/experienceController.js";
const router = express.Router();

router.post("/post", experience);
router.delete("/delete/:experienceId", deleteExperience);
router.get("/", getAllExperience);

export default router;