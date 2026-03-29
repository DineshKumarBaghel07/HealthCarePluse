import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import errorHandler from "./middleware/error.middleware.js";
import chatRouter from "./routes/chat.routes.js";
import morgan from "morgan";
import cors from "cors";
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

// Error handling middleware
app.use(errorHandler);

export default app;
