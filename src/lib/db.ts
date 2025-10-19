import { PrismaClient } from '@prisma/client'

/**
 * Centralized database connection using Prisma singleton pattern
 * This ensures only one PrismaClient instance is created across the application
 * preventing connection pool exhaustion in development and production
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
