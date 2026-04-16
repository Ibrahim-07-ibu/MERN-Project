import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/user.controller.js";
import User from "../schemas/User.js";

const router = express.Router();

router.post("/register",User, registerUser);
router.post("/login", loginUser);
router.get("/profile", getUserProfile);

export default router;
