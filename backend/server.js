import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import expressFileUpload from "express-fileupload";
import { dirname } from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";

const __dirname = dirname(fileURLToPath(import.meta.url));
connectDB();
// dotenv.config();

const app = express();
app.use(helmet());
app.use(expressFileUpload());

app.use(express.static("public"));

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use("/users", userRoute);

const PORT = 5001;

app.listen(PORT, console.log(`Running on port ${PORT}}..`));
