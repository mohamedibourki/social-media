import type { Request, Response, NextFunction } from "express";
import logger from "../config/winston";
import dotenv from "dotenv";

dotenv.config();

export const loggerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // log request
  logger.info(`${req.ip} ${req.method} ${req.url}`);

  next();
};
