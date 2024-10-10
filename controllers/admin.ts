import type { Request, Response } from "express";
import { Users } from "../models/user";
import { Posts } from "../models/post";

export const adminGetAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const adminGetAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Posts.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

export const adminDeleteUser = async (req: Request, res: Response) => {
  try {
    const user = await Users.findOneAndDelete({ id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

export const adminDeletePost = async (req: Request, res: Response) => {
  try {
    const post = await Posts.findOneAndDelete({ id: req.params.id });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};
