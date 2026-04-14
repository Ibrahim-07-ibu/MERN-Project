import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    username: { type: String, required: true },
    action: { type: String, required: true },
    type: { type: String, required: true }, // e.g., "Calculation", "Watchlist"
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Activity", activitySchema);
