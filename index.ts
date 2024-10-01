import dotenv from "dotenv";
import { connectDB } from "./config/mongo";
dotenv.config();

const PORT = process.env.PORT || 3000;

await connectDB();

const server = Bun.serve({
  port: PORT,
  fetch() {
    return new Response("Welcome to Bun!");
  },
});

console.log(`Listening on localhost:${server.port}`);
