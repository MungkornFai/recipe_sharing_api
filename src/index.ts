import express, { Application, Request, Response } from "express";
import userRouter from "./routes/user.route";
import cookieParser from "cookie-parser"
import "dotenv/config"

const app:Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cookieParser())
app.use(express.json());

// Example Route

app.use("/api/users", userRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
