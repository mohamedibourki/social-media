import express from "express";
import authRoutes from "./auth";
import studentRoutes from "./student";
import postRoutes from "./posts";
import commentRoutes from "./comments";
import likeRoutes from "./likes";
import messageRoutes from "./messages";
import friendRequestRoutes from "./friendRequests";
import notificationRoutes from "./notifications";
import adminRoutes from "./admin";

const app = express();

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
app.use("/messages", messageRoutes);
app.use("/friend-requests", friendRequestRoutes);
app.use("/notifications", notificationRoutes);
app.use("/admin", adminRoutes);
