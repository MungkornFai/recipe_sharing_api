import express, { Application, Request, Response } from "express";
import userRouter from "./routes/user.route";
import recipeRouter from "./routes/recipe.route";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { config } from "./config/config";

import errorHandler from "./middlewares/error.handler";

const app: Application = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

// Example Route

app.use("/api/users", userRouter);
app.use("/api/recipes", recipeRouter);


// error handler
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
