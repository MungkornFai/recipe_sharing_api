import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../lib/session.token";

export function authenticatToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  try {
    if (!token) {
        res.status(400).json({ meassage: "unauthorize: user neeed to sig in first" });
        return;
    }
    const user = decodeToken(token);
    req.userId = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error validating token", error });
  }
}
