import type { Request, Response } from "express";
import crypto from "crypto";
import Joi from "joi";
import { sendEmail } from "./nodemailer";
import dotenv from "dotenv";
import { hashPassword } from "./bcrypt";
import { Users } from "../models/user";

dotenv.config();

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const updatePasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
});

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Validate email
    const { error } = resetPasswordSchema.validate({ email });
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json("User with this email not found");
    }

    const token = crypto.randomBytes(20).toString("hex");
    const resetPasswordLink = `${process.env.SERVER_URL}/api/resetpassword/${token}`;
    // const resetPasswordLink = `${process.env.CLIENT_URL}/resetpassword/${token}`;
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);

    await Users.findByIdAndUpdate(user._id, {
      resetToken: token,
      resetTokenExpires: expires,
    });

    const subject = "Reset Password";
    await sendEmail(
      user.firstName as string,
      email,
      subject,
      `${subject} ${resetPasswordLink}`
    );

    res.status(200).json("Reset password email sent successfully");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json("An error occurred while trying to reset the password");
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Validate password
    const { error } = updatePasswordSchema.validate({ password });
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const user = await Users.findOne({ resetToken: token });

    if (
      !user ||
      !user.resetTokenExpires ||
      user.resetTokenExpires < new Date()
    ) {
      return res.status(404).json("Invalid or expired token");
    }

    const hashedPassword = await hashPassword(password);

    await Users.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    });

    return res.status(200).json("Password updated successfully");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json("An error occurred while trying to update the password");
  }
};
