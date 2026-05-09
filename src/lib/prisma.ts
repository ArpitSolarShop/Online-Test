import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

/**
 * Lazy Prisma singleton — only creates the client when first accessed at runtime.
 * This prevents build-time crashes when DATABASE_URL is not yet configured.
 */
function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop: string | symbol) {
    return (getPrisma() as any)[prop];
  },
});
