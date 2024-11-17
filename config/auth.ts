import type { NextFunction, Request, Response } from "express";
import dotnev from "dotenv";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      student: any;
    }
  }
}

dotnev.config();

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "secret",
      (err: any, decoded: any) => {
        if (err || !decoded) {
          res.status(403).json({ message: "Invalid token" });
          return;
        }

        req.student = decoded;
        next();
      }
    );
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
