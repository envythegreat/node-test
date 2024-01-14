// db.ts
import { PrismaClient } from "../../prisma/generated/client/edge";

const prisma = new PrismaClient();

export { prisma };