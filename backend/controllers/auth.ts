import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { authSchema } from "../validators/auth";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../middlewares/nodemailer";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = authSchema.safeParse(req.body);

    if (!data.success)
      return res.status(400).json({ error: data.error.format() });

    const validatedData = data.data;

    const existing = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await argon2.hash(validatedData.password);

    const user = await prisma.user.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        username: validatedData.username,
        email: validatedData.email,
        password: hashed,
        phone: validatedData.phone,
        address: validatedData.address,
        city: validatedData.city,
        state: validatedData.state,
        zip: validatedData.zip,
        profilePicture: validatedData.profilePicture,
        role: validatedData.role ?? "STUDENT",
        clubId: validatedData.clubId,
      },
    });

    const accessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 15 * 60 * 1000),
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return res.status(200).json({ message: "Register successful" });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ errors: err.errors });
    }

    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    // if (!data.success)
    //   return res.status(400).json({ error: data.error.format() });

    // const validatedData = data.data;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user || !user.password)
      return res.status(400).json({ message: "Invalid email or password" });

    const comparedPass = await argon2.verify(user.password, password);
    if (!comparedPass)
      return res.status(400).json({ message: "Invalid email or password" });

    const accessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 15 * 60 * 1000),
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ errors: err.errors });
    }

    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Failed to logout" });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) return res.status(400).send("User not found");

    let token = crypto.randomBytes(32).toString("hex");
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpires: expires,
      },
    });

    const link = `http://localhost:3000/api/auth/reset-password/${token}`;
    await sendEmail(
      user.username,
      user.email,
      "Password Reset",
      `Click the link to reset your password: ${link}`
    );

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json("An error occurred while trying to reset the password");
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await prisma.user.findFirst({
    where: { resetToken: token },
  });

  if (!user || !user.resetTokenExpires || user.resetTokenExpires < new Date())
    return res.status(404).json("Invalid or expired token");

  const hashedPass = await argon2.hash(password);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPass,
      resetToken: null,
      resetTokenExpires: null,
    },
  });

  return res.status(200).json({ message: "Password reset successfully" });
};
