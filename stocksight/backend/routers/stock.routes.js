import express from "express";
import { getStocks, getStockHistory, getStockBySymbol, getLatestCandle } from "../controllers/stock.controller.js";

const router = express.Router();

router.get("/", getStocks);
router.get("/:symbol", getStockBySymbol);
router.get("/:symbol/history", getStockHistory);
router.get("/:symbol/latest", getLatestCandle);

export default router;
