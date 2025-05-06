import { Server, Socket } from "socket.io";
import { Students } from "../models/students";
import { Notifications } from "../models/notification";

const io = new Server(3000, {
  cors: {
    origin: "*", // In production, replace with your frontend domain
    methods: ["GET", "POST"]
  }
});

interface User {
  userId: number;
  socketId: string;
}

const connectedUsers: User[] = [];

io.on("connection", (socket: Socket) => {
  console.log("a user connected");

  // Handle user authentication and store connection
  socket.on("authenticate", async (userId: number) => {
    try {
      const user = await Students.findOne({ id: userId });
      if (user) {
        connectedUsers.push({ userId, socketId: socket.id });
        socket.emit("authenticated", { success: true });
        
        // Notify other users about online status
        socket.broadcast.emit("userOnline", userId);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      socket.emit("authenticated", { success: false });
    }
  });

  socket.on("disconnect", () => {
    const userIndex = connectedUsers.findIndex(user => user.socketId === socket.id);
    if (userIndex !== -1) {
      const userId = connectedUsers[userIndex].userId;
      connectedUsers.splice(userIndex, 1);
      
      // Notify other users about offline status
      socket.broadcast.emit("userOffline", userId);
    }
    console.log("a user disconnected");
  });

  // Private messaging
  socket.on("privateMessage", async (data: { to: number; message: string }) => {
    try {
      const recipient = connectedUsers.find(user => user.userId === data.to);
      if (recipient) {
        io.to(recipient.socketId).emit("privateMessage", {
          from: connectedUsers.find(user => user.socketId === socket.id)?.userId,
          message: data.message
        });
      }

      // Store notification for offline users
      if (!recipient) {
        await Notifications.create({
          studentId: data.to,
          message: data.message,
          type: "message"
        });
      }
    } catch (error) {
      console.error("Private message error:", error);
    }
  });

  // Typing indicators
  socket.on("typing", (data: { to: number }) => {
    const recipient = connectedUsers.find(user => user.userId === data.to);
    if (recipient) {
      io.to(recipient.socketId).emit("typing", {
        from: connectedUsers.find(user => user.socketId === socket.id)?.userId
      });
    }
  });

  socket.on("stopTyping", (data: { to: number }) => {
    const recipient = connectedUsers.find(user => user.userId === data.to);
    if (recipient) {
      io.to(recipient.socketId).emit("stopTyping", {
        from: connectedUsers.find(user => user.socketId === socket.id)?.userId
      });
    }
  });

  // Group messaging
  socket.on("joinRoom", (room: string) => {
    socket.join(room);
    socket.to(room).emit("userJoined", {
      userId: connectedUsers.find(user => user.socketId === socket.id)?.userId
    });
  });

  socket.on("leaveRoom", (room: string) => {
    socket.leave(room);
    socket.to(room).emit("userLeft", {
      userId: connectedUsers.find(user => user.socketId === socket.id)?.userId
    });
  });

  socket.on("roomMessage", (data: { room: string; message: string }) => {
    io.to(data.room).emit("roomMessage", {
      from: connectedUsers.find(user => user.socketId === socket.id)?.userId,
      message: data.message
    });
  });
});

// Error handling
io.on("error", (error) => {
  console.error("Socket.IO error:", error);
});

export default io;