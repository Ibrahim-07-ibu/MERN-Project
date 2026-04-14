import * as stockService from "../services/stockService.js";

const POPULAR_STOCKS = ["AAPL", "MSFT", "TSLA", "NVDA", "GOOGL"];

export const getStocks = async (request, response) => {
    try {

        const allStockData = await stockService.getBatchQuotes(POPULAR_STOCKS);

        const cleanedList = POPULAR_STOCKS.map((symbol) => {
            const quote = allStockData[symbol];

            if (!quote) {
                return null;
            }

            return {
                symbol: quote.symbol,
                company: quote.name,
                price: quote.currentPrice,
                change: quote.change,
                changePercent: quote.changePercent,
                volume: quote.volume
            };
        });

        const finalResults = cleanedList.filter((item) => {
            return item !== null;
        });

        response.status(200).json(finalResults);

    } catch (error) {
        console.error(" Controller Error (getStocks):", error.message);

        response.status(500).json({ 
            message: "Failed to fetch dashboard stocks. Is the API key valid?" 
        });
    }
};

export const getStockHistory = async (request, response) => {
    try {

        const symbolFromUrl = request.params.symbol;
        const rangeFromQuery = request.query.range || '1m';

        const historyData = await stockService.getHistory(symbolFromUrl.toUpperCase(), rangeFromQuery);

        response.status(200).json(historyData);

    } catch (error) {
        console.error(` Controller Error (getHistory) for ${request.params.symbol}:`, error.message);
        response.status(404).json({ message: "Could not find history for this stock." });
    }
};

export const getStockBySymbol = async (request, response) => {
    try {
        const symbolFromUrl = request.params.symbol;

        const latestPriceData = await stockService.getQuote(symbolFromUrl.toUpperCase());

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
        console.error(` Controller Error (getStockBySymbol) for ${request.params.symbol}:`, error.message);
        response.status(404).json({ message: "Stock details not found or we don't provide data for this company." });
    }
};

export const getLatestCandle = async (request, response) => {
    try {
        const symbolFromUrl = request.params.symbol;
        const latestCandle = await stockService.getLatestQuote(symbolFromUrl.toUpperCase());

        if (!latestCandle) {
            return response.status(404).json({ message: "Live data unavailable." });
        }

        response.status(200).json(latestCandle);

    } catch (error) {
        console.error(` Controller Error (getLatestCandle):`, error.message);
        response.status(500).json({ message: "Error fetching live update." });
    }
};
