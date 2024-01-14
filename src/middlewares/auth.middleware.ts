// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../models/db";

declare module "express-serve-static-core" {
  interface Request {
    payload?: any; // Replace 'any' with the specific type of your payload
    user?: any;
  }
}

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).json({ error: "Forrbidden" });
    }

    const [Bearer, token] = authHeader.split(" ");

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY as string,
      (err, payload) => {
        if (err) {
          return res.status(403).json({ error: "Forrbidden" });
        }

        req.payload = payload;
        next();
      }
    );
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const verifyRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).json({ error: "Forrbidden" });
    }

    const [Bearer, token] = authHeader.split(" ");

    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET_KEY as string,
      async (err, payload) => {
        if (err) {
          return res.status(403).json({ error: "Forrbidden" });
        }

        console.log("this is payload", payload);

        const payloadId = payload || 0;

        const user = await prisma.user.findFirst({
          where: { id: Number(payloadId) },
          select: {
            refreshToken: true,
          },
        });

        if (!user) {
          return res.status(403).json({ error: "Forrbidden" });
        }

        if (user.refreshToken !== token) {
          return res.status(403).json({ error: "Forrbidden" });
        }

        req.payload = payload;
        next();
      }
    );
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export { verifyAccessToken, verifyRefreshToken };