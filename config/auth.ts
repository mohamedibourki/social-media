import type { NextFunction, Request, Response } from "express";
import dotnev from "dotenv";
import jwt from "jsonwebtoken";

dotnev.config();

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.accessToken;

    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "secret",
      (err: any, decoded: any) => {
        if (err || !decoded) {
          return res.status(403).json({ message: "Invalid token" });
        }

        // req.student = decoded;
        next();
      }
    );
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
