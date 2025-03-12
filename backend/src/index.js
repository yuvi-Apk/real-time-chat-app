import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser"
import {connectDB} from "./lib/db.js"


dotenv.config();
const app = express();

const PORT = process.env.PORT;

// Middleware
app.use(express.json()); // Allows JSON request body parsing
app.use(cookieParser());

app.use("/api/auth", authRouter);

// default code to mange the error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// check the server is running or not
app.listen(PORT, () => {
  console.log(`Server is running at the Port NO: ${PORT}`);
  connectDB();
});
