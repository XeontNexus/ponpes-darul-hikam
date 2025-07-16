import { Card, CardContent } from "@/components/ui/card"
import { Building, Utensils, Bed, Library, Wifi, Car } from "lucide-react"
import Image from "next/image"

export function Facilities() {
  const facilities = [
    {
      name: "Masjid",
      description: "Masjid yang luas dan nyaman untuk ibadah dan kegiatan keagamaan",
      icon: Building,
    },
    {
      name: "Asrama",
      description: "Asrama yang bersih dan nyaman dengan fasilitas lengkap",
      icon: Bed,
    },
    {
      name: "Perpustakaan",
      description: "Perpustakaan dengan koleksi buku agama dan umum yang lengkap",
      icon: Library,
    },
    {
      name: "Kantin",
      description: "Kantin dengan menu makanan sehat dan bergizi",
      icon: Utensils,
    },
    {
      name: "Internet",
      description: "Akses internet untuk mendukung pembelajaran digital",
      icon: Wifi,
    },
    {
      name: "Transportasi",
      description: "Layanan transportasi untuk kegiatan di luar pesantren",
      icon: Car,
    },
  ]

  return (
    <section id="fasilitas" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-green-800 mb-4">Fasilitas</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kami menyediakan fasilitas lengkap dan modern untuk mendukung kegiatan belajar mengajar dan kehidupan
            santri.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <Image
              src="/placeholder.svg?height=250&width=300"
              alt="Fasilitas 1"
              width={300}
              height={250}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/placeholder.svg?height=250&width=300"
              alt="Fasilitas 2"
              width={300}
              height={250}
              className="rounded-lg shadow-md mt-8"
            />
            <Image
              src="/placeholder.svg?height=250&width=300"
              alt="Fasilitas 3"
              width={300}
              height={250}
              className="rounded-lg shadow-md -mt-8"
            />
            <Image
              src="/placeholder.svg?height=250&width=300"
              alt="Fasilitas 4"
              width={300}
              height={250}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {facilities.map((facility, index) => {
              const IconComponent = facility.icon
              return (
                <Card key={index} className="border-green-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-green-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-800 mb-2">{facility.name}</h3>
                        <p className="text-sm text-gray-600">{facility.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
