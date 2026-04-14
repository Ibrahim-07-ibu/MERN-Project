import Calculation from "../schemas/Calculation.js";

export const saveCalculation = async (request, response) => {
    try {

        const calculationData = request.body;

        const newCalculation = new Calculation(calculationData);

        await newCalculation.save();

        response.status(201).json(newCalculation);
    } catch (error) {

        console.error(" Error saving calculation:", error.message);
        response.status(500).json({ message: "Could not save the calculation results." });
    }
};

export const getCalculations = async (request, response) => {
    try {

        const usernameToFind = request.query.username;

        if (!usernameToFind) {
            return response.status(400).json({ message: "Username is required to find history." });
        }

        const userHistoryList = await Calculation.find({ username: usernameToFind }).sort({ createdAt: -1 });

        response.status(200).json(userHistoryList);
    } catch (error) {
        console.error(" Error fetching history:", error.message);
        response.status(500).json({ message: "Could not retrieve your calculation history." });
    }
};

export const calculateStock = async (request, response) => {
    try {

        const { buyPrice, quantity, targetPrice } = request.body;

        if (buyPrice === undefined || quantity === undefined) {
            return response.status(400).json({ message: "Price and Quantity are required for math." });
        }

        const totalInvestmentAmount = buyPrice * quantity;

        const PriceDifference = targetPrice - buyPrice;
        const totalProfitOrLoss = PriceDifference * quantity;

        response.status(200).json({
            totalInvestment: totalInvestmentAmount,
            profitLoss: totalProfitOrLoss || 0
        });

    } catch (error) {
        console.error(" Math Error in Controller:", error.message);
        response.status(500).json({ message: "An error occurred during calculation." });
    }
};
