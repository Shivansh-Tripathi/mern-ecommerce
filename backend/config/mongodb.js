import mongoose from "mongoose";
const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB");
        });
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error("MONGODB_URI is not set in environment variables");
            return;
        }
        await mongoose.connect(uri);
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};
export default connectDB;