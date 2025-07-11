import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user: any = await prisma.user.findFirst({
          where: {
            googleId: profile.id,
          },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.emails
                ? profile.emails[0].value
                : "no-email-provided",
              firstName: profile.name?.givenName || "Google",
              lastName: profile.name?.familyName || "User",
              username: profile.displayName,
              googleId: profile.id,
              profilePicture: profile.photos ? profile.photos[0].value : null,
              role: "STUDENT",
            },
          });
        }

        return done(null, { user, accessToken, refreshToken });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});
