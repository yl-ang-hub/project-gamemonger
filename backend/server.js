import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/db/db.js";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(process.env.EXPRESS_PORT);
