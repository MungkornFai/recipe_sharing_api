import express, { Application, Request, Response } from "express";
import userRouter from "./routes/user.route";
import cookieParser from "cookie-parser";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { Console } from "console";
import { errorHandler, globalErrorHandler } from "./lib/error.handlers";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cookieParser());
app.use(express.json());

// Example Route

app.use("/api/users", userRouter);

// error handler
app.use((err: any, req: Request, res: Response) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  }
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
