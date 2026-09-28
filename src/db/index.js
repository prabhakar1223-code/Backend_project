import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URL);

        console.log(`MongoDB connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.log("DB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;