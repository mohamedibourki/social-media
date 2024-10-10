import type { Request, Response, NextFunction } from "express";
import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { comparePassword } from "./bcrypt";
import { authenticateToken } from "../config/auth";
import { passport } from "../config/passport";

dotenv.config();
const prisma = new PrismaClient();
const router = express.Router();

const jwtOptions = {
  secretKey: (process.env.JWT_SECRET_KEY as string) || "secret",
};

if (!jwtOptions.secretKey) {
  throw new Error("JWT secret key is not defined");
}

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const accessTokenMinutesDelay = 15;
    const refreshTokenDaysDelay = 7;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await comparePassword(password, user.password as string))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // if (!user.isVerified) {
    //   return res.status(403).json({ message: `Please verify your email before login`})
    // }

    const payload = { sub: user.id, role: user.roleId };

    const accessToken = jwt.sign(payload, jwtOptions.secretKey, {
      expiresIn: `${accessTokenMinutesDelay}m`,
    });

    const refreshToken = jwt.sign(payload, jwtOptions.secretKey, {
      expiresIn: `${refreshTokenDaysDelay}d`,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + accessTokenMinutesDelay * 60 * 1000),
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(
        Date.now() + refreshTokenDaysDelay * 24 * 60 * 60 * 1000
      ),
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", (req, res, next) => {
  const accessTokenMinutesDelay = 15;
  const refreshTokenDaysDelay = 7;

  passport.authenticate("google", (err: Error, data: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!data) {
      return res.redirect("http://localhost:5173/login");
    }

    res.cookie("accessToken", data.accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + accessTokenMinutesDelay * 60 * 1000),
    });

    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(
        Date.now() + refreshTokenDaysDelay * 24 * 60 * 60 * 1000
      ),
    });

    res.redirect("http://localhost:5173");
  })(req, res, next);
});

router.get("/profile", authenticateToken, (req: Request, res: Response) => {
  const userId = req.user?.sub;

  if (!userId) {
    return res.status(400).json({ message: "User ID is missing" });
  }

  prisma.user
    .findUnique({
      where: {
        id: Number(userId),
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        image: user.image,
      });
    })
    .catch((error: any) => {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    });
});

router.post("/refreshToken", (req, res) => {
  try {
    const accessTokenMinutesDelay = 15;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(403).json({ message: "No refresh token provided" });
    }

    jwt.verify(refreshToken, jwtOptions.secretKey, (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const accessToken = jwt.sign({ sub: user.sub }, jwtOptions.secretKey, {
        expiresIn: `${accessTokenMinutesDelay}m`,
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + accessTokenMinutesDelay * 60 * 1000),
      });

      res.status(200).json({ message: "Token refreshed successful" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to refresh token" });
  }
});

router.get("/check", authenticateToken, (req, res) => {
  res.status(200).json({ message: "User is authenticated" });
});

router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Failed to logout" });
  }
});

export { router as authRoutes };
