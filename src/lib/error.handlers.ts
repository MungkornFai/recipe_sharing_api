import { NextFunction, Request, Response } from "express";

export class AuthenticationError extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
  }
}

class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409); // 409 Conflict
  }
}

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  console.error(`[ERROR]: ${err.message}`);

  // Handle operational errors
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Handle unknown errors
  res.status(500).json({
    success: false,
    message: "An unexpected error occurred",
  });
};

function errorHandler(err: any, req: Request, res: Response) {
  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  res.status(500).json({
    message: "An unexpected error occurred",
  });
}

export { AppError, ConflictError,errorHandler };
