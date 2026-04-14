import mongoose from "mongoose";

/**
 * DATABASE CONNECTION UTILITY
 * 
 * This file handles the connection between our Node.js server and MongoDB.
 * We use the 'mongoose' library, which is the most popular way for Node.js
 * to talk to MongoDB.
 */

// We keep the Database connection function separate so it can be called exactly when needed.
const connectDB = async () => {
    // We grab the secret MongoDB URL from our .env file for security.
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
        console.error("❌ ERROR: MONGO_URL not found in .env file.");
        return false;
    }

    try {
        /**
         * We attempt to connect to the database.
         * Configuration Options:
         * - family: 4 (Forces IPv4, often faster on standard networks)
         * - serverSelectionTimeoutMS: 15000 (Wait 15 seconds before giving up)
         */
        await mongoose.connect(mongoUrl, {
            family: 4, 
            serverSelectionTimeoutMS: 15000,
            connectTimeoutMS: 20000,
            tls: true,
        });

        console.log("✅ MongoDB Connected Successfully!");
        return true; // Return true so the server knows it's connected
    } catch (error) {
        // If anything goes wrong (wrong password, IP not whitelisted), we catch it here.
        console.error("❌ MongoDB Connection Failure:", error.message);
        
        console.log("\n💡 TIP: If this is an SSL/Handshake error, check your MongoDB Atlas IP Whitelist.");
        console.log("💡 Check if your current IP is allowed to access the database.");
        
        return false; // Return false so the server can start in 'Degraded Mode' instead of crashing
    }
};

/**
 * Utility function to close the database connection.
 * Used when the server is shutting down to prevent 'hanging' connections.
 */
export const closeDB = async () => {
    try {
        await mongoose.connection.close();
        console.log("💤 MongoDB Connection Closed.");
    } catch (error) {
        console.error("❌ Error during DB disconnect:", error.message);
    }
};

export default connectDB;
