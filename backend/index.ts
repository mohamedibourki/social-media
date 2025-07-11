import express from "express";
import router from "./routes/index";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";
import "./config/passport";
import { loggerMiddleware } from "./middlewares/winston";
import { limiter } from "./middlewares/rateLimiter";
import helmet from "helmet";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(loggerMiddleware);
app.use(cors());
app.use(limiter);
app.use(helmet());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
