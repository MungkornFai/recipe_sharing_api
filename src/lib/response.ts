import type { Response } from "express";

export function sendSuccess(
  res: Response,
  message: string,
  data: any = null,
  statusCode: number = 200
) {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function sendError(
  res: Response,
  message: string,
  statusCode: number = 500,
  error: any = null
) {
  res.status(statusCode).json({
    success: false,
    message,
    error: error,
  });
}
