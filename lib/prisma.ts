import { PrismaClient } from "@/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function getDirectUrl(): string {
  const url = process.env.DATABASE_URL ?? ""
  
  // If already a direct postgres:// URL, use it directly
  if (url.startsWith("postgres://") || url.startsWith("postgresql://")) {
    return url
  }
  
  // For prisma+postgres:// URLs (local Prisma Postgres), extract the direct connection URL
  // The local Prisma Postgres always runs Postgres on port 51214 by default
  // Decode the api_key to get the actual postgres URL
  if (url.startsWith("prisma+postgres://") || url.startsWith("prisma://")) {
    try {
      const apiKeyMatch = url.match(/api_key=([^&]+)/)
      if (apiKeyMatch) {
        const apiKey = apiKeyMatch[1]
        // pad base64 if needed
        const padded = apiKey + "=".repeat((4 - apiKey.length % 4) % 4)
        const decoded = Buffer.from(padded, "base64").toString("utf8")
        const parsed = JSON.parse(decoded)
        if (parsed.databaseUrl) return parsed.databaseUrl
      }
    } catch {
      // fallback to default local URL
    }
    // Default local Prisma Postgres direct URL
    return "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable"
  }
  
  return url
}

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: getDirectUrl(),
  })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
