import { PrismaClient } from '@prisma/client';
import fs from 'node:fs';
import path from 'node:path';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function resolveDatabaseUrl(): string | undefined {
  // On Vercel, the filesystem is read-only at runtime except for /tmp.
  // We ship a pre-seeded SQLite file with the deployment and copy it into
  // /tmp on cold start so Prisma can open it read-write. Writes only live
  // for the lifetime of that serverless instance (not durably persisted).
  if (process.env.VERCEL) {
    const runtimeDb = '/tmp/aicredibility.db';
    if (!fs.existsSync(runtimeDb)) {
      const bundledDb = path.join(process.cwd(), 'prisma', 'seed-data.db');
      if (fs.existsSync(bundledDb)) {
        fs.copyFileSync(bundledDb, runtimeDb);
      }
    }
    return `file:${runtimeDb}`;
  }
  return process.env.DATABASE_URL;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasources: { db: { url: resolveDatabaseUrl() } },
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
