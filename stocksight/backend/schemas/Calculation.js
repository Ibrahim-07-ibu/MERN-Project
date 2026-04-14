import mongoose from "mongoose";

const calculationSchema = new mongoose.Schema({
    username: { type: String, required: true },
    symbol: { type: String, required: true },
    buyPrice: { type: Number, required: true },
    targetPrice: { type: Number, required: true },
    stopLoss: { type: Number, required: true },
    quantity: { type: Number, required: true },
    profit: { type: Number, required: true },
    risk: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Calculation", calculationSchema);
