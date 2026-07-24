import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../app/generated/prisma/client'

const prismaClientSingleton = () => {
  const pool = new PrismaPg({
    connectionString: process.env.DATABASE_URL!
    // idleTimeoutMillis: 30000,
    // connectionTimeoutMillis: 5000
    // max: 10,
    // min: 0,
  })
  return new PrismaClient({ adapter: pool })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// For dev hot reload
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
