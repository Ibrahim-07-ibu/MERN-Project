import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB, { closeDB } from "./environments/db.js";

// Step 1: Import all our Route Handlers
// These files contain the logic for different parts of our app (Stocks, Users, etc.)
import stockRoutes from "./routers/stock.routes.js";
import watchlistRoutes from "./routers/watchlist.routes.js";
import calculationRoutes from "./routers/calculation.routes.js";
import activityRoutes from "./routers/activity.routes.js";
import userRoutes from "./routers/user.routes.js";

// Step 2: Basic Server Setup
dotenv.config(); // Loads secret variables from .env file

const serverApp = express(); // Creates the actual Express application
const PORT_NUMBER = parseInt(process.env.PORT, 10) || 5000; // Choose port (5000 is default for MERN)

/**
 * Step 3: Middleware Setup
 * Middleware handles the request BEFORE it reaches our API logic.
 */

// CORS: Allows our Frontend (localhost:5173) to talk to this Backend.
serverApp.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// JSON: Allows the server to read data sent as JSON by the frontend.
serverApp.use(express.json());

/**
 * Step 4: API Routes Integration
 * We tell the server: "If a URL starts with /api/stocks, use stockRoutes logic".
 */
serverApp.use("/api/stocks", stockRoutes);
serverApp.use("/api/watchlist", watchlistRoutes);
serverApp.use("/api/calculations", calculationRoutes);
serverApp.use("/api/activity", activityRoutes);
serverApp.use("/api/users", userRoutes);

// Basic route to check if the server is healthy
serverApp.get("/", (request, response) => {
    response.send({
        status: "Online",
        service: "StockSight API",
        message: "The Stock Market Backend is running correctly!"
    });
});

/**
 * Step 5: Application Startup Sequence
 * We wrap this in an 'async' function so we can use 'await' for the database.
 */
async function startServer() {
    try {
        console.log("🛠  Starting StockSight Server...");

        // A. Attempt to connect to MongoDB
        const isDatabaseConnected = await connectDB();
        
        // B. Start listening for network requests
        const activeServer = serverApp.listen(PORT_NUMBER, () => {
            console.log(`🚀 SUCCESS: Server is live at http://localhost:${PORT_NUMBER}`);
            
            if (isDatabaseConnected === false) {
                console.warn("📉 NOTE: Running in 'Offline Mode'. Database features are disabled.");
            } else {
                console.log("📊 NOTE: Running in 'Full Mode'. All database features are active.");
            }
        });

        /**
         * Step 6: Error & Close Handling
         * Makes the server professional and easy to manage during development.
         */

        // If something else is already using our Port (5000), show a clear error.
        activeServer.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`❌ PORT ERROR: Port ${PORT_NUMBER} is already being used by another app.`);
                console.error(`👉 Solution: Close any terminal running another server or restart your computer.`);
                process.exit(1);
            }
        });

        // Graceful Shutdown logic: Closes the database nicely when you stop the server.
        const shutDownProperly = async (signalName) => {
            console.log(`\n⬇️  Stopping server (${signalName})...`);
            await closeDB();
            process.exit(0);
        };

        // Listen for standard 'STOP' signals (like Ctrl+C)
        process.on('SIGINT', () => shutDownProperly('SIGINT'));
        process.on('SIGTERM', () => shutDownProperly('SIGTERM'));

    } catch (criticalError) {
        console.error("❌ STARTUP FAILED:", criticalError.message);
        process.exit(1);
    }
}

// Kick off the startup sequence!
startServer();