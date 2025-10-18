import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const data = await prisma.consultation.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(data)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Database fetch error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    await prisma.consultation.create({
      data: {
        // Пацієнт
        name: body.name,
        age: Number(body.age),
        gender: body.gender || null,
        phone: body.phone || null,
        height: body.height ? Number(body.height) : null,
        weight: body.weight ? Number(body.weight) : null,
        bmi:
          body.height && body.weight
            ? Number(body.weight) / Math.pow(Number(body.height) / 100, 2)
            : null,

        // Скарги
        complaints: body.complaints || null,

        // Обстеження
        examination_oglyad: Boolean(body.examination_oglyad),
        examination_xray: Boolean(body.examination_xray),
        examination_uzi: Boolean(body.examination_uzi),
        examination_kt: Boolean(body.examination_kt),
        examination_mrt: Boolean(body.examination_mrt),

        // Медична історія
        has_chronic_diseases: body.has_chronic_diseases === 'yes',
        chronic_diseases: body.chronic_diseases || null,
        takes_medications: body.takes_medications === 'yes',
        medications: body.medications || null,
        pain_scale: body.pain_scale ? Number(body.pain_scale) : null,

        // Коментарі
        additional_comments: body.additional_comments || null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        error: e instanceof Error ? e.message : String(e),
      },
      { status: 500 }
    )
  }
}
