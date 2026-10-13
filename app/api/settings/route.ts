import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const data = await prisma.settings.findFirst()
    return NextResponse.json(data ?? {})
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json()
    const existing = await prisma.settings.findFirst()
    let result
    if (existing) {
      result = await prisma.settings.update({ where: { id: existing.id }, data })
    } else {
      result = await prisma.settings.create({ data })
    }
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
