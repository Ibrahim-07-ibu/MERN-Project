import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getUserProfile);
router.post("/profile", getUserProfile); // Supporting POST as well per "query or body" constraint

export default router;
