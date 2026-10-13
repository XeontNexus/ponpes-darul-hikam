import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const data = await prisma.fotoKegiatan.findMany({ orderBy: { createdAt: "asc" } })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Failed to fetch documentation photos" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const item = await prisma.fotoKegiatan.create({ data })
    return NextResponse.json(item)
  } catch {
    return NextResponse.json({ error: "Failed to create documentation photo" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...data } = await req.json()
    const item = await prisma.fotoKegiatan.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch {
    return NextResponse.json({ error: "Failed to update documentation photo" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    await prisma.fotoKegiatan.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete documentation photo" }, { status: 500 })
  }
}
