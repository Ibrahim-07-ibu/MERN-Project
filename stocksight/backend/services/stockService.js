import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const STOCK_API_KEY = process.env.STOCK_API_KEY;
const API_BASE_URL = 'https://api.twelvedata.com';

const dataCache = new Map();
const CACHE_LIFESPAN = 5 * 60 * 1000;

function getFromCache(cacheKey) {
    const cachedItem = dataCache.get(cacheKey);

    if (!cachedItem) {
        return null;
    }

    const currentTime = Date.now();
    const ageOfData = currentTime - cachedItem.timestamp;
    
    if (ageOfData < CACHE_LIFESPAN) {
        return cachedItem.data;
    }

    return null;
}

function saveToCache(cacheKey, freshData) {
    dataCache.set(cacheKey, {
        data: freshData,
        timestamp: Date.now()
    });
}

export const getQuote = async (stockSymbol) => {
    const key = `quote_${stockSymbol}`;

    const existingData = getFromCache(key);
    if (existingData !== null) {
        return existingData;
    }

    try {

        const apiResponse = await axios.get(`${API_BASE_URL}/quote`, {
            params: {
                symbol: stockSymbol,
                apikey: STOCK_API_KEY
            }
        });

        const rawResult = apiResponse.data;

        if (rawResult.status === 'error' || rawResult.code === 429) {
            throw new Error(rawResult.message || "API limit reached.");
        }

        const cleanedStockData = {
            symbol: rawResult.symbol,
            name: rawResult.name || rawResult.symbol,
            currentPrice: parseFloat(rawResult.close || rawResult.price || 0),
            change: parseFloat(rawResult.change || 0),
            changePercent: parseFloat(rawResult.percent_change || 0),
            volume: parseInt(rawResult.volume || 0),
            currency: rawResult.currency
        };

        saveToCache(key, cleanedStockData);
        
        return cleanedStockData;
    } catch (error) {
        console.error(` API Error for ${stockSymbol}:`, error.message);
        throw new Error(`Could not get data for ${stockSymbol}. Please try again later.`);
    }
};

export const getBatchQuotes = async (symbolsArray) => {

    const symbolsString = Array.isArray(symbolsArray) ? symbolsArray.join(',') : symbolsArray;
    const key = `batch_${symbolsString}`;

    const cachedBatch = getFromCache(key);
    if (cachedBatch !== null) {
        return cachedBatch;
    }

    try {

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

        const mappedResults = {};
        const individualSymbols = symbolsString.split(',');

        individualSymbols.forEach((currentSymbol) => {

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

                saveToCache(`quote_${currentSymbol}`, mappedResults[currentSymbol]);
            }
        });

        saveToCache(key, mappedResults);
        return mappedResults;

    } catch (error) {
        console.error(` Batch API Error:`, error.message);
        throw error;
    }
};

export const getHistory = async (stockSymbol, timeRange = '1m') => {
    const key = `history_${stockSymbol}_${timeRange}`;

    const cachedHistory = getFromCache(key);
    if (cachedHistory !== null) {
        return cachedHistory;
    }

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

        let formattedHistory = rawHistory.values.map((item) => {
            return {
                time: Math.floor(new Date(item.datetime).getTime() / 1000),
                dateString: item.datetime.split(' ')[0],
                open: parseFloat(item.open),
                high: parseFloat(item.high),
                low: parseFloat(item.low),
                close: parseFloat(item.close)
            };
        });

        formattedHistory.reverse();

        if (timeRange === '1d' && formattedHistory.length > 0) {
            const latestDateInResults = formattedHistory[formattedHistory.length - 1].dateString;
            formattedHistory = formattedHistory.filter(h => h.dateString === latestDateInResults);
        }

        const finalChartData = formattedHistory.map((item) => {
            const { dateString, ...restOfProperties } = item;
            return restOfProperties;
        });

        saveToCache(key, finalChartData);
        return finalChartData;

    } catch (error) {
        console.error(` History API Error (${stockSymbol}):`, error.message);
        throw error;
    }
};

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
