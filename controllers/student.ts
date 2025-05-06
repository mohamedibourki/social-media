import type { Request, Response } from "express";
import { Students } from "../models/students";
import { Counter } from "../utils/dbConter";

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await Students.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

export const getStudentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const student = await Students.findOne({ id: req.params.id });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
};

export const createStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "studentId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    
    const studentData = {
      ...req.body,
      id: counter.seq
    };
    
    const student = await Students.create(studentData);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error creating student", error });
  }
};

export const updateStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const student = await Students.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const student = await Students.findOneAndDelete({ id: req.params.id });
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};

export const getStudentProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const student = await Students.findOne({ id: req.params.id });
    res.status(200).json({ profile: student });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student profile", error });
  }
};
