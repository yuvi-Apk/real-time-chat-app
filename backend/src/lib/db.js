import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MangoDB Connected ${conn.Connection.host}`);
  } catch (error) {
    console.log("MongoDB connections Error",error);
  }
};
