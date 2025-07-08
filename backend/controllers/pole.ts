import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPoles = async (req: Request, res: Response) => {
  try {
    const poles = await prisma.pole.findMany();
    res.status(200).json(poles);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};