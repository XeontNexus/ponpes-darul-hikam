import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { existsSync } from "fs"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { image, folder = "banners" } = body

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Expect base64 image (e.g., "data:image/jpeg;base64,/9j/4AAQSkZJRg...")
    const matches = image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/)
    if (!matches || matches.length !== 3) {
      return NextResponse.json({ error: "Invalid image format" }, { status: 400 })
    }

    const extension = matches[1] === "jpeg" ? "jpg" : matches[1]
    const base64Data = matches[2]
    const buffer = Buffer.from(base64Data, "base64")

    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`
    
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const filePath = path.join(uploadDir, fileName)
    await writeFile(filePath, buffer)

    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${folder}/${fileName}` 
    })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
