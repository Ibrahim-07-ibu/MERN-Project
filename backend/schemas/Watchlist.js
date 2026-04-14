import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
    username: { type: String, required: true },
    symbol: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Watchlist", watchlistSchema);
