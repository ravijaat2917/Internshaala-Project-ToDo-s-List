import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./DataBase/connectDB.js";
import morgan from "morgan";
import userRoutes from "./Routes/user.Routes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.use(morgan("dev"));
app.use('/api/v1',userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Listening on PORT ${PORT}`);
});
