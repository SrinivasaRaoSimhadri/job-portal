import express from  "express";
const router = express.Router();
import { followers, follow, following, unfollow, Exploreusers } from "../controllers/followControllers.js";

router.get("/exploreusers", Exploreusers);
router.get("/followers", followers);
router.get("/following", following);
router.post("/follow/:followId", follow);
router.post("/unfollow/:unFollowId", unfollow);
export default router;