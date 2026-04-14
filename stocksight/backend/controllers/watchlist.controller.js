import Watchlist from "../schemas/Watchlist.js";

export const addToWatchlist = async (req, res) => {
    try {
        const { username, symbol } = req.body;

        const existing = await Watchlist.findOne({ username, symbol });
        if (existing) {
            return res.status(400).json({ message: "Stock already in watchlist" });
        }

        const newItem = new Watchlist({ username, symbol });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getWatchlist = async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        const watchlist = await Watchlist.find({ username });
        res.status(200).json(watchlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromWatchlist = async (req, res) => {
    try {
        const { username, symbol } = req.body;
        await Watchlist.findOneAndDelete({ username, symbol });
        res.status(200).json({ message: "Removed from watchlist" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
