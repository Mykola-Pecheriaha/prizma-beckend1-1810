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

    // Обробити масив обстежень
    const examinationMap = {
      examination_oglyad: body.examinations?.includes('Огляд') || false,
      examination_analyses: body.examinations?.includes('Аналізи') || false,
      examination_ekg: body.examinations?.includes('ЕКГ') || false,
      examination_xray: body.examinations?.includes('Рентген') || false,
      examination_uzi: body.examinations?.includes('УЗД') || false,
      examination_kt: body.examinations?.includes('КТ') || false,
      examination_mrt: body.examinations?.includes('МРТ') || false,
    }

    await prisma.consultation.create({
      data: {
        // Пацієнт
        name: body.name,
        age: body.age ? Number(body.age) : null,
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
        ...examinationMap,

        // Медична історія
        has_chronic_diseases: Boolean(body.hasChronicDiseases),
        chronic_diseases: body.chronicDiseases || null,
        takes_medications: Boolean(body.takesMedications),
        medications: body.medications || null,
        pain_scale: body.painLevel ? Number(body.painLevel) : null,
        has_allergies: Boolean(body.hasAllergy),
        allergies: body.allergies || null,

        // Коментарі
        additional_comments: body.additionalNotes || null,
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
