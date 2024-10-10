import type { Request, Response } from "express";
import { Users } from "../models/user";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = new Users({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET_KEY || "secret",
      {
        expiresIn: "1d",
      }
    );
    res.cookie("accessToken", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout successful" });
};

export const refreshToken = (req: Request, res: Response) => {
  // Implement token refresh logic here
  res.status(200).json({ message: "Token refreshed" });
};
