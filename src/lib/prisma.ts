import { PrismaClient } from "@prisma/client";

// Prevent multiple Prisma Client instances in dev (Next.js hot reload)
// https://pris.ly/d/help/next-js-best-practices
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
