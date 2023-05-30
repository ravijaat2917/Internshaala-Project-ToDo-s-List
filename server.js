import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./DataBase/connectDB.js";
import morgan from "morgan";
import userRoutes from "./Routes/user.Routes.js";
import listRoutes from "./Routes/lists.Routes.js";

// Creating App Instance from Express
const app = express();

// Configure Required Middlewares
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Connecting Database (MongoDB)
connectDB();

// Making Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", listRoutes);

// Creating Port for Listening
const PORT = process.env.PORT;

// Listen App On Server
app.listen(PORT, () => {
  console.log(`Server Listening on PORT ${PORT}`);
});