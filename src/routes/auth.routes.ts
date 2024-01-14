// src/routes/auth.routes.ts
import express, { Request, Response } from "express";
import { prisma } from "../models/db";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/token.service";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password, region, box } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username,
        password,
        region,
        box,
      },
    });

    if (user) {
      const accessToken = generateAccessToken({ id: user.id });
      const refreshToken = generateRefreshToken({ id: user.id });

      // Update user record with tokens
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });

      res.json({ accessToken, refreshToken });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;