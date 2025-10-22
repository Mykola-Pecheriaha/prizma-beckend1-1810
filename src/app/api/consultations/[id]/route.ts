import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export async function DELETE(request: NextRequest, context: RouteParams) {
  try {
    const { id: idParam } = await context.params
    const id = parseInt(idParam)

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid consultation ID' },
        { status: 400 }
      )
    }

    // Перевіряємо чи існує консультація
    const existingConsultation = await prisma.consultation.findUnique({
      where: { id },
    })

    if (!existingConsultation) {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      )
    }

    // Видаляємо консультацію
    await prisma.consultation.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Consultation deleted successfully', id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete consultation error:', error)
    return NextResponse.json(
      { error: 'Failed to delete consultation' },
      { status: 500 }
    )
  }
}
