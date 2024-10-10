import { Request, Response } from "express";
import { Messages } from "../models/message";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const message = new Messages({ ...req.body, senderId: req.user.id });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error });
  }
};

export const getInbox = async (req: Request, res: Response) => {
  try {
    const messages = await Messages.find({ receiverId: req.user.id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inbox", error });
  }
};

export const getSentMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Messages.find({ senderId: req.user.id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sent messages", error });
  }
};

export const getMessageById = async (req: Request, res: Response) => {
  try {
    const message = await Messages.findOne({ id: req.params.id });
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error fetching message", error });
  }
};

export const markMessageAsRead = async (req: Request, res: Response) => {
  try {
    const message = await Messages.findOneAndUpdate(
      { id: req.params.id },
      { status: "read" },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error marking message as read", error });
  }
};
