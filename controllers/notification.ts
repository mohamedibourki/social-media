import type { Request, Response } from "express";
import { Notifications } from "../models/notification";

export const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notifications.find({ userId: req.user.id });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const notification = await Notifications.findOneAndUpdate(
      { id: req.params.id, userId: req.user.id },
      { isRead: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error marking notification as read", error });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const notification = await Notifications.findOneAndDelete({
      id: req.params.id,
      userId: req.user.id,
    });
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notification", error });
  }
};