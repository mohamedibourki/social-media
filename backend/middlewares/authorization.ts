import type { NextFunction, Request, Response } from "express";
import { Role } from "../models/role";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const studentRoleId = req.student?.role;

  try {
    const role = await Role.findById(studentRoleId);

    if (role?.reference === "admin") {
      next();
    } else {
      return res.status(403).json("Access denied");
    }
  } catch (error) {
    return res.status(500).json("Error checking student role");
  }
};

export const isStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const studentRoleId = req.student?.role;

  try {
    const role = await Role.findById(studentRoleId);

    if (role?.reference === "student") {
      next();
    } else {
      return res.status(403).json("Access denied");
    }
  } catch (error) {
    return res.status(500).json("Error checking student role");
  }
};
