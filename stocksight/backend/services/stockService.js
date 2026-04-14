import axios from 'axios';
import dotenv from 'dotenv';

/**
 * STOCK MARKET SERVICE
 * 
 * This file is the "Engine" of our backend. It handles talking to the 
 * external Twelve Data API to get live stock prices and history.
 */

dotenv.config();

// Configuration for Twelve Data API
const STOCK_API_KEY = process.env.STOCK_API_KEY;
const API_BASE_URL = 'https://api.twelvedata.com';

/**
 * CACHE SYSTEM
 * Why we use this: Twelve Data has a "Free Tier" limit (8 requests per minute).
 * If we didn't use a cache, every time you refresh your page, we would waste a request.
 * The cache saves the result for 5 minutes so we stay under the limit.
 */
const dataCache = new Map();
const CACHE_LIFESPAN = 5 * 60 * 1000; // 5 minutes (in milliseconds)

/**
 * Function to get data from our temporary memory (Cache)
 */
function getFromCache(cacheKey) {
    const cachedItem = dataCache.get(cacheKey);
    
    // If we have nothing saved under this key, return null
    if (!cachedItem) {
        return null;
    }

    // Check if the data is too old (Expired)
    const currentTime = Date.now();
    const ageOfData = currentTime - cachedItem.timestamp;
    
    if (ageOfData < CACHE_LIFESPAN) {
        return cachedItem.data; // Data is still fresh!
    }

    return null; // Data is too old, we need to fetch NEW data from the API
}

/**
 * Function to save data in our temporary memory (Cache)
 */
function saveToCache(cacheKey, freshData) {
    dataCache.set(cacheKey, {
        data: freshData,
        timestamp: Date.now()
    });
}

/**
 * FETCH SINGLE STOCK QUOTE
 * Gets the current price, change, and volume for a single ticker (e.g. "AAPL")
 */
export const getQuote = async (stockSymbol) => {
    const key = `quote_${stockSymbol}`;
    
    // Step 1: Check if we already have this price in our cache
    const existingData = getFromCache(key);
    if (existingData !== null) {
        return existingData;
    }

    try {
        // Step 2: If NOT in cache, ask the external Twelve Data API
        const apiResponse = await axios.get(`${API_BASE_URL}/quote`, {
            params: {
                symbol: stockSymbol,
                apikey: STOCK_API_KEY
            }
        });

        const rawResult = apiResponse.data;

        // Step 3: Check if the API returned an error (like "Rate Limit Exceeded")
        if (rawResult.status === 'error' || rawResult.code === 429) {
            throw new Error(rawResult.message || "API limit reached.");
        }

        /**
         * Step 4: Transform the complex API response into a simple "Beginner-Friendly" object.
         * We parse strings into Numbers so they are ready for calculations.
         */
        const cleanedStockData = {
            symbol: rawResult.symbol,
            name: rawResult.name || rawResult.symbol,
            currentPrice: parseFloat(rawResult.close || rawResult.price || 0),
            change: parseFloat(rawResult.change || 0),
            changePercent: parseFloat(rawResult.percent_change || 0),
            volume: parseInt(rawResult.volume || 0),
            currency: rawResult.currency
        };

        // Step 5: Save this new data in our cache so we don't have to ask the API again for 5 minutes
        saveToCache(key, cleanedStockData);
        
        return cleanedStockData;
    } catch (error) {
        console.error(`❌ API Error for ${stockSymbol}:`, error.message);
        throw new Error(`Could not get data for ${stockSymbol}. Please try again later.`);
    }
};

/**
 * FETCH MULTIPLE QUOTES (BATCH)
 * This is efficient because 1 API call gets data for 5+ stocks at once.
 */
export const getBatchQuotes = async (symbolsArray) => {
    // Converts array ["AAPL", "TSLA"] to string "AAPL,TSLA" for the API
    const symbolsString = Array.isArray(symbolsArray) ? symbolsArray.join(',') : symbolsArray;
    const key = `batch_${symbolsString}`;

    // 1. Check cache first
    const cachedBatch = getFromCache(key);
    if (cachedBatch !== null) {
        return cachedBatch;
    }

    try {
        // 2. Fetch from API
        const apiResponse = await axios.get(`${API_BASE_URL}/quote`, {
            params: {
                symbol: symbolsString,
                apikey: STOCK_API_KEY
            }
        });

        const rawData = apiResponse.data;

        if (rawData.status === 'error' || rawData.code === 429) {
            throw new Error(rawData.message || "Batch API limit reached.");
        }

        // 3. Loop through the API results and clean each one
        const mappedResults = {};
        const individualSymbols = symbolsString.split(',');

        individualSymbols.forEach((currentSymbol) => {
            // If we asked for multiple stocks, Twelve Data puts each in its own object.
            // If just one, it's a single object. We handle both here.
            const stockData = individualSymbols.length > 1 ? rawData[currentSymbol] : rawData;
            
            if (stockData && stockData.symbol) {
                mappedResults[currentSymbol] = {
                    symbol: stockData.symbol,
                    name: stockData.name || stockData.symbol,
                    currentPrice: parseFloat(stockData.close || stockData.price || 0),
                    change: parseFloat(stockData.change || 0),
                    changePercent: parseFloat(stockData.percent_change || 0),
                    volume: parseInt(stockData.volume || 0),
                    currency: stockData.currency
                };
                
                // Also update individual stock caches for future single-stock requests
                saveToCache(`quote_${currentSymbol}`, mappedResults[currentSymbol]);
            }
        });

        // 4. Save the whole batch to the cache
        saveToCache(key, mappedResults);
        return mappedResults;

    } catch (error) {
        console.error(`❌ Batch API Error:`, error.message);
        throw error;
    }
};

/**
 * FETCH HISTORICAL DATA (FOR CHARTS)
 * Gets a list of past price points so we can draw a line graph.
 */
export const getHistory = async (stockSymbol, timeRange = '1m') => {
    const key = `history_${stockSymbol}_${timeRange}`;

    // 1. Check cache
    const cachedHistory = getFromCache(key);
    if (cachedHistory !== null) {
        return cachedHistory;
    }

    // Determine how many data points and which interval to use
    let apiInterval = '1day';
    let dataPointsCount = 30;

    if (timeRange === '1d') {
        apiInterval = '1min';
        dataPointsCount = 500;
    } else if (timeRange === '1w') {
        apiInterval = '1h';
        dataPointsCount = 200;
    }

    try {
        const apiResponse = await axios.get(`${API_BASE_URL}/time_series`, {
            params: {
                symbol: stockSymbol,
                interval: apiInterval,
                outputsize: dataPointsCount,
                apikey: STOCK_API_KEY
            }
        });

        const rawHistory = apiResponse.data;

        if (rawHistory.status === 'error' || rawHistory.code === 429) {
            throw new Error(rawHistory.message);
        }

        if (!rawHistory.values) {
            return [];
        }

        /**
         * Step 2: Transform raw strings into proper numbers and timestamps.
         * The charting library (Lightweight Charts) needs data in a specific format { time, open, high, low, close }.
         */
        let formattedHistory = rawHistory.values.map((item) => {
            return {
                time: Math.floor(new Date(item.datetime).getTime() / 1000), // Convert date to Unix Timestamp
                dateString: item.datetime.split(' ')[0], // Helper to filter current day
                open: parseFloat(item.open),
                high: parseFloat(item.high),
                low: parseFloat(item.low),
                close: parseFloat(item.close)
            };
        });

        // The API returns data Newest -> Oldest. We need Oldest -> Newest for the chart.
        formattedHistory.reverse();

        // If '1d' is requested, only show data from the most recent trading day
        if (timeRange === '1d' && formattedHistory.length > 0) {
            const latestDateInResults = formattedHistory[formattedHistory.length - 1].dateString;
            formattedHistory = formattedHistory.filter(h => h.dateString === latestDateInResults);
        }

        // Clean up the final result by removing our temporary date string
        const finalChartData = formattedHistory.map((item) => {
            const { dateString, ...restOfProperties } = item;
            return restOfProperties;
        });

        // 3. Cache and return
        saveToCache(key, finalChartData);
        return finalChartData;

    } catch (error) {
        console.error(`❌ History API Error (${stockSymbol}):`, error.message);
        throw error;
    }
};

/**
 * FETCH LATEST CANDLE (LIVE UPDATES)
 * A simple helper that creates a "candle" from the latest quote.
 */
export const getLatestQuote = async (stockSymbol) => {
    try {
        const currentQuote = await getQuote(stockSymbol);
        return {
            time: Math.floor(Date.now() / 1000),
            open: currentQuote.currentPrice,
            high: currentQuote.currentPrice,
            low: currentQuote.currentPrice,
            close: currentQuote.currentPrice,
            volume: currentQuote.volume
        };
    } catch (error) {
        return null;
    }
};
