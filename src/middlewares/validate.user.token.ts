import { NextFunction, Request, Response } from "express";

export function authenticatToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  try {
    if (!token) {
        res.status(400).json({ meassage: "unauthorize" });
        return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error validating token", error });
  }
}
