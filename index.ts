import express, { type ErrorRequestHandler, type NextFunction } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { connectDB } from "./config/mongo";
import studentRoutes from "./routes/student";
import authRoutes from "./routes/auth";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(async (req: any, res: any, next: any) => {
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    try {
      const rawBody = await new Response(req.body).arrayBuffer();
      req.body = JSON.parse(Buffer.from(rawBody).toString());
    } catch (error) {
      return res.status(400).json({ message: "Invalid request body" });
    }
  }
  next();
});
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

await connectDB();

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);

// error middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!", error: err.message });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
