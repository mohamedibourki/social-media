import type { NextFunction, Request, Response } from "express";
import dotnev from "dotenv";
import jwt from "jsonwebtoken";

dotnev.config();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(
      token,
      process.env.JWT_SECRET || "mysecret",
      (err: any, decoded: Express.User | undefined) => {
        if (err || !decoded) return res.status(403).json({ message: "Invalid token" });

        req.user = decoded;
        next();
      }
    );
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
