import type { Request, Response } from "express";
import { Posts } from "../models/posts";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Posts.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const post = new Posts(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Posts.findOne({ id: req.params.id });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Posts.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
};

export const deletePost = async (req: Request, res: Response) => {
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
