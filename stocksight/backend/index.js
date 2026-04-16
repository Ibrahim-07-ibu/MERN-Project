import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./environments/db.js";

import stockRoutes from "./routers/stock.routes.js";
import userRoutes from "./routers/user.routes.js";

dotenv.config();

const serverApp = express();
const PORT_NUMBER = process.env.PORT || 5000;
serverApp.use(cors());

serverApp.use(express.json());

serverApp.use("/api/stocks", stockRoutes);
serverApp.use("/api/users", userRoutes);

serverApp.get("/", (request, response) => {
  response.send({
    message: "The Stock Market Backend is running correctly!",
  });
});

const startServer = async () => {
  try {
    console.log("Starting server...");

    await connectDB();

    serverApp.listen(PORT_NUMBER, () => {
      console.log(`Server running on http://localhost:${PORT_NUMBER}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
  }
};

startServer();
