import type { Request, Response } from "express";
import { Students } from "../models/student";
import jwt from "jsonwebtoken";

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const student = new Students({ username, email, password });
    await student.save();
    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering student", error });
  }
};

export const loginStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const student = await Students.findOne({ email }).select("+password");

    if (!student || !(await student.comparePassword(password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate access token
    const accessToken = jwt.sign(
      { id: student.id },
      process.env.JWT_SECRET_KEY || "secret",
      { expiresIn: "15m" }
    );

    // Generate refresh token with longer expiration
    const refreshToken = jwt.sign(
      { id: student.id },
      process.env.REFRESH_TOKEN_SECRET || "refresh-secret",
      { expiresIn: "1d" }
    );

    // Set both tokens as HTTP-only cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    const socketToken = jwt.sign(
      { id: student.id },
      process.env.SOCKET_SECRET_KEY || "socket-secret",
      { expiresIn: "15m" }
    );

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const logoutStudent = (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logout successful" });
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ message: "Refresh token not found" });
      return;
    }

    // Verify the refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || "refresh-secret"
    ) as { id: string };

    // Find the student
    const student = await Students.findById(decoded.id);
    if (!student) {
      res.status(401).json({ message: "Student not found" });
      return;
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      { id: student.id },
      process.env.JWT_SECRET_KEY || "secret",
      { expiresIn: "15m" }
    );

    // Set new access token as HTTP-only cookie
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Refresh token expired" });
      return;
    }
    res.status(401).json({ message: "Invalid refresh token" });
  }
};
