import type { Request, Response } from "express";
import { Comments } from "../models/comments";

export const addComment = async (req: Request, res: Response) => {
  try {
    const comment = new Comments({ ...req.body, postId: req.params.postId });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

export const getCommentsByPost = async (req: Request, res: Response) => {
  try {
    const comments = await Comments.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comments.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error updating comment", error });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comments.findOneAndDelete({ id: req.params.id });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};
