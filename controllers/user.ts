import type { Request, Response } from "express";
import { Users } from "../models/user";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await Users.findOne({ id: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await Users.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await Users.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await Users.findOneAndDelete({ id: req.params.id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await Users.findOne({ id: req.params.id });
    res.status(200).json({ profile: user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
};
