import type { NextFunction, Request, Response } from "express";
import { Role } from "../models/role";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRoleId = req.user?.role;

  try {
    const role = await Role.findById(userRoleId);

    if (role?.reference === "admin") {
      next();
    } else {
      return res.status(403).json("Access denied");
    }
  } catch (error) {
    return res.status(500).json("Error checking user role");
  }
};

export const isUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRoleId = req.user?.role;

  try {
    const role = await Role.findById(userRoleId);

    if (role?.reference === "user") {
      next();
    } else {
      return res.status(403).json("Access denied");
    }
  } catch (error) {
    return res.status(500).json("Error checking user role");
  }
};
