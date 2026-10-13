import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const data = await prisma.statistikSantri.findMany({ orderBy: { jenjang: "asc" } })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { jenjang, jumlah } = await req.json()
    const item = await prisma.statistikSantri.upsert({
      where: { jenjang },
      update: { jumlah },
      create: { jenjang, jumlah },
    })
    return NextResponse.json(item)
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
