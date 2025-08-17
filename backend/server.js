import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/db/db.js";
import userRouter from "./src/routers/users.js";
import cors from "cors";

connectDB();

const app = express();

// cors for API calls: allow localhost:5173 to call localhost:5001
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", userRouter);

app.listen(process.env.EXPRESS_PORT);
