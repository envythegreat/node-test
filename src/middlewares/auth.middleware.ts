// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../models/db';

const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const accessToken = authorizationHeader.split(' ')[1];

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET || '');
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

const verifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.headers['x-refresh-token'] as string;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if refresh token exists in the database
    const user = await prisma.user.findFirst({ where: { refreshToken } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    req.user = { id: user.id, username: user.username, type: user.type }; // Add user information to the request
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

export { verifyAccessToken, verifyRefreshToken };
