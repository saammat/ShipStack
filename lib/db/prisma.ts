import { PrismaClient } from '@/prisma/client';

declare global {
  // 让 PrismaClient 在 hot-reload 时保持单例
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
