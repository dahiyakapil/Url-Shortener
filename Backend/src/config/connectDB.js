import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected Successfully || ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error in connectDB");
    console.error("MongoDB connection FAILED", error)
  }
};

export default connectDB;
