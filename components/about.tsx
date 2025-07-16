import { Card, CardContent } from "@/components/ui/card"
import { Heart, Target, Eye } from "lucide-react"
import Image from "next/image"

export function About() {
  return (
    <section id="tentang" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-green-800 mb-4">Tentang Kami</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pondok Pesantren Al-Hikmah didirikan dengan misi untuk menciptakan generasi yang memiliki keseimbangan
            antara ilmu agama dan ilmu umum.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
          <div>
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Sejarah Pondok Pesantren"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-green-800">Sejarah Singkat</h3>
            <p className="text-gray-700 leading-relaxed">
              Didirikan pada tahun 1994 oleh KH. Ahmad Dahlan, Pondok Pesantren DARUL HIKAM telah berkembang menjadi
              salah satu lembaga pendidikan Islam terkemuka di Indonesia. Dengan komitmen untuk memberikan pendidikan
              berkualitas yang menggabungkan nilai-nilai Islam dengan pengetahuan modern.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Saat ini, pesantren kami telah meluluskan ribuan santri yang tersebar di berbagai profesi dan
              berkontribusi positif bagi masyarakat dan bangsa.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-3">Visi</h3>
              <p className="text-gray-600">
                Menjadi lembaga pendidikan Islam terdepan yang menghasilkan generasi berakhlak mulia, cerdas, dan
                berdaya saing global.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-3">Misi</h3>
              <p className="text-gray-600">
                Menyelenggarakan pendidikan Islam yang komprehensif, mengembangkan potensi santri, dan membangun
                karakter yang kuat.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-3">Nilai</h3>
              <p className="text-gray-600">
                Berpegang teguh pada nilai-nilai Islam, kejujuran, kedisiplinan, dan semangat untuk terus belajar dan
                berkembang.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
