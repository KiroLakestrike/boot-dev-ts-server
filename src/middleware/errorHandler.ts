import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customErrors.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      error: err.message,
    });
    return;
  }

  res.status(500).json({
    error: "Something went wrong on our end",
  });
}
