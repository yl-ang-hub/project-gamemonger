import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./src/db/db.js";
import authRouter from "./src/routers/auth.js";
import usersRouter from "./src/routers/users.js";
import userlistRouter from "./src/routers/userlists.js";
import rawgApi from "./src/routers/rawgApi.js";
import userReviews from "./src/routers/userReviews.js";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

connectDB();
const app = express();

// cors for API calls: allow calls from localhost
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("JSON parsing error:", err.message);
    return res.status(400).send({ status: 400, msg: "invalid JSON format" });
  } else if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    err.type === "entity.parse.failed"
  ) {
    console.error("URL-encoding parsing error:", err.message);
    return res.status(400).json({
      status: 400,
      msg: "invalid form data format",
    });
  }
  next();
});

app.use("/auth", authRouter);
app.use("/user", usersRouter);
app.use("/lists", userlistRouter);
app.use("/api", rawgApi);
app.use("/api", userReviews);

app.use((err, req, res, next) => {
  console.error(err.message);
  console.error(err.stack);

  res.status(err.status || 500).json({ status: "Error", msg: err.message });
});

const PORT = process.env.EXPRESS_PORT || 5001;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
