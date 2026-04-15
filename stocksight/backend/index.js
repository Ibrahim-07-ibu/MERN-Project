import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB, { closeDB } from "./environments/db.js";

import stockRoutes from "./routers/stock.routes.js";
import calculationRoutes from "./routers/calculation.routes.js";
import userRoutes from "./routers/user.routes.js";

dotenv.config();

const serverApp = express();
const PORT_NUMBER = parseInt(process.env.PORT, 10) || 5000;

serverApp.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

serverApp.use(express.json());

serverApp.use("/api/stocks", stockRoutes);
serverApp.use("/api/calculations", calculationRoutes);
serverApp.use("/api/users", userRoutes);

serverApp.get("/", (request, response) => {
    response.send({
        status: "Online",
        service: "StockSight API",
        message: "The Stock Market Backend is running correctly!"
    });
});

async function startServer() {
    try {
        console.log("  Starting StockSight Server...");

        const isDatabaseConnected = await connectDB();

        const activeServer = serverApp.listen(PORT_NUMBER, () => {
            console.log(` SUCCESS: Server is live at http://localhost:${PORT_NUMBER}`);
            
            if (isDatabaseConnected === false) {
                console.warn(" NOTE: Running in 'Offline Mode'. Database features are disabled.");
            } else {
                console.log(" NOTE: Running in 'Full Mode'. All database features are active.");
            }
        });

        activeServer.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(` PORT ERROR: Port ${PORT_NUMBER} is already being used by another app.`);
                console.error(` Solution: Close any terminal running another server or restart your computer.`);
                process.exit(1);
            }
        });

        const shutDownProperly = async (signalName) => {
            console.log(`\n️  Stopping server (${signalName})...`);
            await closeDB();
            process.exit(0);
        };

        process.on('SIGINT', () => shutDownProperly('SIGINT'));
        process.on('SIGTERM', () => shutDownProperly('SIGTERM'));

    } catch (criticalError) {
        console.error(" STARTUP FAILED:", criticalError.message);
        process.exit(1);
    }
}

startServer();