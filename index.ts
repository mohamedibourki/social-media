import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/mongo";
import { usersRouter } from "./routes/users";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", usersRouter);

await connectDB();

app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});
