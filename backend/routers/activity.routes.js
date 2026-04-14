import express from "express";
import { logActivity, getActivities } from "../controllers/activity.controller.js";

const router = express.Router();

router.post("/", logActivity);
router.get("/", getActivities);

export default router;
