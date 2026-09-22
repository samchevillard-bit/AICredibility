import { PrismaClient } from '@prisma/client';
import { databaseUrl } from '@/lib/db-env';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const url = databaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    ...(url ? { datasources: { db: { url } } } : {}),
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
