import express from "express";
import { deleteProject, project } from "../controllers/projectController.js";
const router = express.Router();

router.post("/post", project);
router.delete("/delete/:projectId", deleteProject);

export default router;