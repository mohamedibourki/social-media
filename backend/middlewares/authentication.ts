import type { Request, Response, NextFunction } from "express";
import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { comparePassword } from "./bcrypt";
import { authenticateToken } from "../config/auth";
// import { passport } from "../config/passport";

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

    const student = await prisma.student.findUnique({
      where: { email },
    });

    if (
      !student ||
      !(await comparePassword(password, student.password as string))
    ) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // if (!student.isVerified) {
    //   return res.status(403).json({ message: `Please verify your email before login`})
    // }

    const payload = { sub: student.id, role: student.roleId };

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
  const studentId = req.student?.sub;

  if (!studentId) {
    return res.status(400).json({ message: "Student ID is missing" });
  }

  prisma.student
    .findUnique({
      where: {
        id: Number(studentId),
      },
    })
    .then((student) => {
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json({
        name: `${student.firstName} ${student.lastName}`,
        email: student.email,
        image: student.image,
      });
    })
    .catch((error: any) => {
      console.error("Error fetching student:", error);
      res.status(500).json({ message: "Failed to fetch student" });
    });
});

router.post("/refreshToken", (req, res) => {
  try {
    const accessTokenMinutesDelay = 15;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(403).json({ message: "No refresh token provided" });
    }

    jwt.verify(refreshToken, jwtOptions.secretKey, (err: any, student: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const accessToken = jwt.sign({ sub: student.sub }, jwtOptions.secretKey, {
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
  res.status(200).json({ message: "Student is authenticated" });
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
