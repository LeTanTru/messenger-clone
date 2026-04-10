import { PrismaClient } from '../generated/prisma/client';

declare global {
  var globalPrisma: PrismaClient;
}

const prisma = globalThis.globalPrisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.globalPrisma = prisma;

export { prisma };
