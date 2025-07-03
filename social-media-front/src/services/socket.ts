import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

class SocketService {
  private socket;
  private static instance: SocketService;

  private constructor() {
    this.socket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: false,
    });

    this.socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
  }

  static getInstance() {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  connect(token: string) {
    this.socket.auth = { token };
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  // Message handling
  sendPrivateMessage(receiverId: number, message: string) {
    this.socket.emit("privateMessage", { to: receiverId, message });
  }

  onPrivateMessage(
    callback: (data: { from: number; message: string }) => void
  ) {
    this.socket.on("privateMessage", callback);
  }

  // Typing indicators
  sendTyping(receiverId: number) {
    this.socket.emit("typing", { to: receiverId });
  }

  sendStopTyping(receiverId: number) {
    this.socket.emit("stopTyping", { to: receiverId });
  }

  onTyping(callback: (data: { from: number }) => void) {
    this.socket.on("typing", callback);
  }

  onStopTyping(callback: (data: { from: number }) => void) {
    this.socket.on("stopTyping", callback);
  }
}
export const socketService = SocketService.getInstance();