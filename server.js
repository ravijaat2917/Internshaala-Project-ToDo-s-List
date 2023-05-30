import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./DataBase/connectDB.js";
import morgan from "morgan";
import userRoutes from "./Routes/user.Routes.js";
import listRoutes from "./Routes/lists.Routes.js";
import path from 'path';
import { fileURLToPath } from "url";

// Creating App Instance from Express
const app = express();

// Configure Required Middlewares
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(path.join(__dirname));
app.use(express.static(path.join(__dirname,"./client/build")));

// Connecting Database (MongoDB)
connectDB();

// Making Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", listRoutes);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
});

// Creating Port for Listening
const PORT = process.env.PORT;

// Listen App On Server
app.listen(PORT, () => {
  console.log(`Server Listening on PORT ${PORT}`);
});