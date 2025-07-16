import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"
import Image from "next/image"

export function News() {
  const news = [
    {
      title: "Penerimaan Santri Baru Tahun 2024/2025",
      excerpt: "Pendaftaran santri baru telah dibuka dengan berbagai program unggulan dan fasilitas terbaru.",
      date: "15 Januari 2024",
      author: "Admin",
      category: "Pengumuman",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Wisuda Santri Tahfidz Al-Qur'an",
      excerpt: "Sebanyak 25 santri berhasil menyelesaikan hafalan 30 juz Al-Qur'an dalam acara wisuda yang khidmat.",
      date: "10 Januari 2024",
      author: "Ustadz Ahmad",
      category: "Kegiatan",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Pelatihan Keterampilan Santri",
      excerpt: "Program pelatihan keterampilan untuk membekali santri dengan kemampuan praktis dan wirausaha.",
      date: "5 Januari 2024",
      author: "Ustadzah Fatimah",
      category: "Program",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <section id="berita" className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-green-800 mb-4">Berita & Pengumuman</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ikuti perkembangan terbaru dan kegiatan-kegiatan di Pondok Pesantren DARUL HIKAM.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {news.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-green-200 overflow-hidden">
              <div className="relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-green-700">{item.category}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-green-800 line-clamp-2">{item.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{item.author}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-green-700 text-green-700 hover:bg-green-50 bg-transparent"
                >
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-green-700 hover:bg-green-800">Lihat Semua Berita</Button>
        </div>
      </div>
    </section>
  )
}
