import mongoose from "mongoose";

const connectDB = async () => {

    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
        console.error(" ERROR: MONGO_URL not found in .env file.");
        return false;
    }

    try {
        
        await mongoose.connect(mongoUrl, {
            family: 4, 
            serverSelectionTimeoutMS: 15000,
            connectTimeoutMS: 20000,
            tls: true,
        });

        console.log(" MongoDB Connected Successfully!");
        return true;
    } catch (error) {

        console.error(" MongoDB Connection Failure:", error.message);
        
        console.log("\n TIP: If this is an SSL/Handshake error, check your MongoDB Atlas IP Whitelist.");
        console.log(" Check if your current IP is allowed to access the database.");
        
        return false;
    }
};

export const closeDB = async () => {
    try {
        await mongoose.connection.close();
        console.log(" MongoDB Connection Closed.");
    } catch (error) {
        console.error(" Error during DB disconnect:", error.message);
    }
};

export default connectDB;
