import type { Request, Response } from "express";
import { Students } from "../models/student";
import { Posts } from "../models/post";

export const adminGetAllStudents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const students = await Students.find({});
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

export const adminGetAllPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const posts = await Posts.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

export const adminDeleteStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const student = await Students.findOneAndDelete({ id: req.params.id });
    if (!student) {
      res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};

export const adminDeletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const post = await Posts.findOneAndDelete({ id: req.params.id });
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};
