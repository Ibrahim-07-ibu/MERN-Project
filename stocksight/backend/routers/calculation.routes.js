import express from "express";
import { saveCalculation, getCalculations, calculateStock } from "../controllers/calculation.controller.js";

const router = express.Router();

router.post("/", saveCalculation);
router.get("/", getCalculations);
router.post("/calculate", calculateStock);

export default router;
