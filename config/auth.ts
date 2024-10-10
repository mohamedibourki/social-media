import type { NextFunction, Request, Response } from "express";
import dotnev from "dotenv";
import jwt from "jsonwebtoken";

dotnev.config();

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "secret",
      (err: any, decoded: any) => {
        if (err || !decoded) {
          return res.status(403).json({ message: "Invalid token" });
        }

        // req.user = decoded;
        next();
      }
    );
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
