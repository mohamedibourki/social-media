import type { Request, Response } from "express";
import { FriendRequests } from "../models/friendRequest";

export const sendFriendRequest = async (req: Request, res: Response) => {
  try {
    const friendRequest = new FriendRequests({
      senderId: req.student.id,
      receiverId: req.body.receiverId,
    });
    await friendRequest.save();
    res.status(201).json(friendRequest);
  } catch (error) {
    res.status(500).json({ message: "Error sending friend request", error });
  }
};

export const getReceivedFriendRequests = async (
  req: Request,
  res: Response
) => {
  try {
    const requests = await FriendRequests.find({
      receiverId: req.student.id,
      status: "pending",
    });
    res.status(200).json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching received friend requests", error });
  }
};

export const getSentFriendRequests = async (req: Request, res: Response) => {
  try {
    const requests = await FriendRequests.find({ senderId: req.student.id });
    res.status(200).json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching sent friend requests", error });
  }
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
  try {
    const request = await FriendRequests.findOneAndUpdate(
      { id: req.params.id, receiverId: req.student.id },
      { status: "accepted" },
      { new: true }
    );
    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: "Error accepting friend request", error });
  }
};

export const rejectFriendRequest = async (req: Request, res: Response) => {
  try {
    const request = await FriendRequests.findOneAndUpdate(
      { id: req.params.id, receiverId: req.student.id },
      { status: "rejected" },
      { new: true }
    );
    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: "Error rejecting friend request", error });
  }
};
