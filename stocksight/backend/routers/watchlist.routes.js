import express from "express";
import { addToWatchlist, getWatchlist, removeFromWatchlist } from "../controllers/watchlist.controller.js";

const router = express.Router();

router.post("/", addToWatchlist);
router.get("/", getWatchlist);
router.delete("/", removeFromWatchlist);

export default router;
