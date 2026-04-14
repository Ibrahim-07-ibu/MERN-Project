import * as stockService from "../services/stockService.js";

/**
 * STOCK CONTROLLER
 * 
 * Controllers are the "Managers" of our API. They handle the incoming requests
 * from the browser (Frontend), tell the Service to get the data, and then 
 * send the response back to the user.
 */

// A default list of stocks to show on the Dashboard if the user hasn't searched for anything specific.
const POPULAR_STOCKS = ["AAPL", "MSFT", "TSLA", "NVDA", "GOOGL"];

/**
 * ACTION: GET STOCKS (For Dashboard)
 * This function handles the request for the initial set of stock cards.
 */
export const getStocks = async (request, response) => {
    try {
        // Step 1: Ask the service to get prices for our popular stocks
        const allStockData = await stockService.getBatchQuotes(POPULAR_STOCKS);

        // Step 2: Extract just the pieces we need for the browser
        const cleanedList = POPULAR_STOCKS.map((symbol) => {
            const quote = allStockData[symbol];
            
            // If the API didn't return data for this symbol, we skip it
            if (!quote) {
                return null;
            }

            // Return a simple object that a beginner can easily understand
            return {
                symbol: quote.symbol,
                company: quote.name,
                price: quote.currentPrice,
                change: quote.change,
                changePercent: quote.changePercent,
                volume: quote.volume
            };
        });

        // Step 3: Remove any 'null' items (stocks that failed to load)
        const finalResults = cleanedList.filter((item) => {
            return item !== null;
        });

        // Step 4: Send the list back to the frontend with a 200 (Success) status
        response.status(200).json(finalResults);

    } catch (error) {
        console.error("❌ Controller Error (getStocks):", error.message);
        
        // If anything fails, send a 500 (Server Error) with the error message
        response.status(500).json({ 
            message: "Failed to fetch dashboard stocks. Is the API key valid?" 
        });
    }
};

/**
 * ACTION: GET STOCK HISTORY (For Charts)
 * This function handles requests like: /api/stocks/history/AAPL?range=1m
 */
export const getStockHistory = async (request, response) => {
    try {
        // Step 1: Extract 'symbol' from the URL path and 'range' from the URL query
        const symbolFromUrl = request.params.symbol;
        const rangeFromQuery = request.query.range || '1m'; // Default to 1 month if not provided

        // Step 2: Fetch history from the service
        const historyData = await stockService.getHistory(symbolFromUrl.toUpperCase(), rangeFromQuery);

        // Step 3: Send the array of prices back to the frontend
        response.status(200).json(historyData);

    } catch (error) {
        console.error(`❌ Controller Error (getHistory) for ${request.params.symbol}:`, error.message);
        response.status(404).json({ message: "Could not find history for this stock." });
    }
};

/**
 * ACTION: GET SINGLE STOCK DETAILS
 * Used when you click on a specific stock to see its dedicated page.
 */
export const getStockBySymbol = async (request, response) => {
    try {
        const symbolFromUrl = request.params.symbol;

        // Fetch a single quote from the service
        const latestPriceData = await stockService.getQuote(symbolFromUrl.toUpperCase());

        // Prepare the data to match what our frontend components expect
        const cleanedResponse = {
            symbol: latestPriceData.symbol,
            company: latestPriceData.name,
            price: latestPriceData.currentPrice,
            change: latestPriceData.change,
            changePercent: latestPriceData.changePercent,
            volume: latestPriceData.volume,
            currency: latestPriceData.currency
        };

        response.status(200).json(cleanedResponse);

    } catch (error) {
        console.error(`❌ Controller Error (getStockBySymbol) for ${request.params.symbol}:`, error.message);
        response.status(404).json({ message: "Stock details not found." });
    }
};

/**
 * ACTION: GET LATEST CANDLE
 * Used for the "Live" update feature on the chart.
 */
export const getLatestCandle = async (request, response) => {
    try {
        const symbolFromUrl = request.params.symbol;
        const latestCandle = await stockService.getLatestQuote(symbolFromUrl.toUpperCase());

        if (!latestCandle) {
            return response.status(404).json({ message: "Live data unavailable." });
        }

        response.status(200).json(latestCandle);

    } catch (error) {
        console.error(`❌ Controller Error (getLatestCandle):`, error.message);
        response.status(500).json({ message: "Error fetching live update." });
    }
};
