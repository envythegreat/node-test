// src/services/token.service.ts
import jwt from "jsonwebtoken";

const generateAccessToken = (payload: object): string =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY || "", {
    expiresIn: "1d",
  });

const generateRefreshToken = (payload: object): string =>
  jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY || "", {
    expiresIn: "7d",
  });

export { generateAccessToken, generateRefreshToken };