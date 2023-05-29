import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`DataBase Connected Successfully`);
  } catch (error) {
    console.log(`Cannot Connect DATABASE  Error : ${error}`);
  }
};

export default connectDB;
