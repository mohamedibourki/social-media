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

    const token = jwt.sign(
      { id: student.id },
      process.env.JWT_SECRET_KEY || "secret",
      { expiresIn: "1d" }
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
    });

    const socketToken = jwt.sign(
      { id: student.id },
      process.env.SOCKET_SECRET_KEY || "socket-secret",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      socketToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const logoutStudent = (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout successful" });
};

export const refreshToken = (req: Request, res: Response) => {
  // Implement token refresh logic here
  res.status(200).json({ message: "Token refreshed" });
};
