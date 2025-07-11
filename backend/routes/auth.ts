import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { register, resetPassword, forgotPassword } from "../controllers/auth";
import { login } from "../controllers/auth";
import { logout } from "../controllers/auth";
import { authMiddleware } from "../middlewares/auth";

const JWT_SECRET = process.env.JWT_SECRET!;

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forget-password", forgotPassword);
router.post("/reset-password/:userId/:token", resetPassword);

// google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", (err: Error, data: any, info: any) => {
      if (err) return next(err);
      if (!data) return res.redirect("http://localhost:5173/login");

      res.cookie("accessToken", data.accessToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 15 * 60 * 1000),
      });

      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      res.redirect("http://localhost:5173/home");
    })(req, res, next);
  }
);

router.get("/check", authMiddleware, (req: Request, res: Response): any => {
  res.status(200).json({ message: "User is authenticated" });
});

router.post("/refreshToken", (req: Request, res: Response): any => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return res.status(403).json({ message: "No refresh token provided" });

    jwt.verify(refreshToken, JWT_SECRET, (err: any, user: any) => {
      if (err)
        return res.status(403).json({ message: "Invalid refresh token" });

      const accessToken = jwt.sign({ sub: user.sub }, JWT_SECRET, {
        expiresIn: "15m",
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 15 * 60 * 1000),
      });

      res.status(200).json({ message: "Token refreshed successful" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to refresh token" });
  }
});

export default router;
