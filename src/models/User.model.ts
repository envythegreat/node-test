// src/models/User.model.ts
// src/models/User.model.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UserWithTokens {
  id: number;
  username: string;
  password: string;
  region: string;
  box: string;
  accessToken?: string;
  refreshToken?: string;
}

export default prisma.user;
