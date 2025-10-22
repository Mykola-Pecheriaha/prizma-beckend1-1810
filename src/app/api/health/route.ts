import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Test database connection
    const count = await prisma.consultation.count()

    // Test environment variables
    const env = {
      POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL ? 'OK' : 'MISSING',
      POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING
        ? 'OK'
        : 'MISSING',
      DATABASE_URL: process.env.DATABASE_URL ? 'OK' : 'MISSING',
      NODE_ENV: process.env.NODE_ENV || 'unknown',
    }

    return NextResponse.json({
      status: 'OK',
      database_connection: 'OK',
      consultations_count: count,
      environment_variables: env,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json(
      {
        status: 'ERROR',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
