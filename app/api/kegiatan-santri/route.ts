import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const model = prisma.kegiatanSantri

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const where = undefined
    const data = await model.findMany({ where, orderBy: [{ order: "asc" }, { id: "asc" }] })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    delete data.id
    const item = await model.create({ data })
    return NextResponse.json(item)
  } catch {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...data } = await req.json()
    const item = await model.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    await model.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
