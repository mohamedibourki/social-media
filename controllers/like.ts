import { Request, Response } from "express";
import { Likes } from "../models/like";

export const likePost = async (req: Request, res: Response) => {
  try {
    const like = new Likes({ userId: req.user.id, postId: req.params.postId });
    await like.save();
    res.status(201).json({ message: "Post liked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error liking post", error });
  }
};

export const unlikePost = async (req: Request, res: Response) => {
  try {
    const result = await Likes.findOneAndDelete({
      userId: req.user.id,
      postId: req.params.postId,
    });
    if (!result) {
      return res.status(404).json({ message: "Like not found" });
    }
    res.status(200).json({ message: "Post unliked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unliking post", error });
  }
};

export const getUserLikes = async (req: Request, res: Response) => {
  try {
    const likes = await Likes.find({ userId: req.params.userId });
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user likes", error });
  }
};