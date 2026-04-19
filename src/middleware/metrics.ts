import { Request, Response, NextFunction } from "express";
import { config } from "../config.js";

export function metricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  config.api.fileServerHits++;
  next();
}
