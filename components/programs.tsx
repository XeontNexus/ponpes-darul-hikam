import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, GraduationCap, Users, Clock } from "lucide-react"

export function Programs() {
  const programs = [
    {
      title: "Tahfidz Al-Qur'an",
      description: "Program menghafal Al-Qur'an dengan metode yang efektif dan menyenangkan",
      duration: "6 Tahun",
      capacity: "50 Santri",
      level: "Semua Tingkat",
      icon: BookOpen,
    },
    {
      title: "Madrasah Tsanawiyah",
      description: "Pendidikan setingkat SMP dengan kurikulum agama dan umum yang seimbang",
      duration: "3 Tahun",
      capacity: "120 Santri",
      level: "Menengah",
      icon: GraduationCap,
    },
    {
      title: "Madrasah Aliyah",
      description: "Pendidikan setingkat SMA dengan fokus pada persiapan perguruan tinggi",
      duration: "3 Tahun",
      capacity: "100 Santri",
      level: "Atas",
      icon: Users,
    },
    {
      title: "Program Intensif Bahasa Arab",
      description: "Kursus bahasa Arab untuk meningkatkan kemampuan berbahasa santri",
      duration: "1 Tahun",
      capacity: "30 Santri",
      level: "Semua Tingkat",
      icon: Clock,
    },
  ]

  return (
    <section id="program" className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-green-800 mb-4">Program Pendidikan</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kami menyediakan berbagai program pendidikan yang dirancang untuk mengembangkan potensi santri secara
            optimal.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {programs.map((program, index) => {
            const IconComponent = program.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow border-green-200">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <CardTitle className="text-green-800">{program.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {program.level}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-green-800">Durasi:</span>
                      <p className="text-gray-600">{program.duration}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-green-800">Kapasitas:</span>
                      <p className="text-gray-600">{program.capacity}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
