import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { UserSignUp } from "../types/user";

export const validate =
  (schema: ZodSchema, type: "body" | "query" | "params") =>
  (req: Request<{}, {}, UserSignUp>, res: Response, next: NextFunction) => {
    let dataToValidate;
    switch (type) {
      case "body":
        dataToValidate = req.body;
        break;
      case "query":
        dataToValidate = req.query;
        break;
      case "params":
        dataToValidate = req.params;
        break;
      default:
        res.status(400).json({ message: "Invalid validation type" });
    }
    try {
      schema.parse(dataToValidate);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        res
          .status(400)
          .json({ message: "Validation failed", error: error.errors });
      }
      res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  };
