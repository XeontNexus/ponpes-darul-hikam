import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const items = await prisma.fotoSejarah.findMany({ orderBy: { order: "asc" } })
    return NextResponse.json(items)
  } catch (error) {
    console.error("Failed to fetch Banner Slider 2:", error)
    return NextResponse.json({ error: "Gagal mengambil Banner Slider 2" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const item = await prisma.fotoSejarah.create({ data })
    return NextResponse.json(item)
  } catch (error) {
    console.error("Failed to create Banner Slider 2:", error)
    return NextResponse.json({ error: "Gagal menambah Banner Slider 2" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...data } = await req.json()
    const item = await prisma.fotoSejarah.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch (error) {
    console.error("Failed to update Banner Slider 2:", error)
    return NextResponse.json({ error: "Gagal menyimpan Banner Slider 2" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    await prisma.fotoSejarah.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete Banner Slider 2:", error)
    return NextResponse.json({ error: "Gagal menghapus Banner Slider 2" }, { status: 500 })
  }
}
