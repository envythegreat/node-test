// src/services/token.service.ts
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const generateAccessToken = (payload: object): string => {
  const secretKey = process.env.ACCESS_TOKEN_SECRET || '';
  return jwt.sign(payload, secretKey, { expiresIn: '15m' });
};

const generateRefreshToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

export { generateAccessToken, generateRefreshToken };
