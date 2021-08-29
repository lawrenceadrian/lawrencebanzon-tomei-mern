import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoute from "./routes/userRoute.js";

connectDB();
// dotenv.config();

const app = express();

app.use(express.json());

app.use("/users", userRoute);

const PORT = 5001;

app.listen(PORT, console.log(`Running on port ${PORT}..`));
