import Calculation from "../schemas/Calculation.js";

/**
 * CALCULATION CONTROLLER
 * 
 * This file handles logic for the "Stock Calculator".
 * It can calculate profit/loss and save those results to the database
 * so the user can see their history later.
 */

/**
 * ACTION: SAVE A CALCULATION
 * Stores a calculation result in MongoDB.
 */
export const saveCalculation = async (request, response) => {
    try {
        // Step 1: Get the data sent by the frontend from the request body
        const calculationData = request.body;

        // Step 2: Create a new instance of our 'Calculation' model
        const newCalculation = new Calculation(calculationData);

        // Step 3: Save it to the database
        await newCalculation.save();

        // Step 4: Send back the saved object with a 201 (Created) status
        response.status(201).json(newCalculation);
    } catch (error) {
        // If the DB is down or data is invalid, catch the error
        console.error("❌ Error saving calculation:", error.message);
        response.status(500).json({ message: "Could not save the calculation results." });
    }
};

/**
 * ACTION: GET PREVIOUS CALCULATIONS
 * Fetches a list of history for a specific user.
 */
export const getCalculations = async (request, response) => {
    try {
        // Step 1: Get the 'username' from the URL query (e.g., ?username=ibrahim)
        const usernameToFind = request.query.username;

        if (!usernameToFind) {
            return response.status(400).json({ message: "Username is required to find history." });
        }

        // Step 2: Query the database for calculations matching this username
        // We use .sort({ createdAt: -1 }) to show the newest ones first.
        const userHistoryList = await Calculation.find({ username: usernameToFind }).sort({ createdAt: -1 });

        // Step 3: Send the list back to the user
        response.status(200).json(userHistoryList);
    } catch (error) {
        console.error("❌ Error fetching history:", error.message);
        response.status(500).json({ message: "Could not retrieve your calculation history." });
    }
};

/**
 * ACTION: PERFORM STOCK MATH
 * A simple helper that does the math on the server if needed.
 */
export const calculateStock = async (request, response) => {
    try {
        // Step 1: Extract the numbers from the request body
        const { buyPrice, quantity, targetPrice } = request.body;
        
        // Step 2: Validation (Make sure we actually have numbers to work with)
        if (buyPrice === undefined || quantity === undefined) {
            return response.status(400).json({ message: "Price and Quantity are required for math." });
        }

        /**
         * Step 3: Clear Step-by-Step Math
         * We do it in pieces so it's easy for a beginner to read.
         */
        
        // Total Investment = Price of 1 share * Number of shares
        const totalInvestmentAmount = buyPrice * quantity;

        // Profit/Loss = (Ending Price - Starting Price) * Number of shares
        const PriceDifference = targetPrice - buyPrice;
        const totalProfitOrLoss = PriceDifference * quantity;

        // Step 4: Send the math results back
        response.status(200).json({
            totalInvestment: totalInvestmentAmount,
            profitLoss: totalProfitOrLoss || 0
        });

    } catch (error) {
        console.error("❌ Math Error in Controller:", error.message);
        response.status(500).json({ message: "An error occurred during calculation." });
    }
};
