import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, FileText, Users, Calendar } from "lucide-react"

export function Registration() {
  const requirements = [
    "Fotokopi Akta Kelahiran",
    "Fotokopi Kartu Keluarga",
    "Pas Foto 3x4 (6 lembar)",
    "Fotokopi Ijazah terakhir",
    "Surat Keterangan Sehat",
    "Surat Pernyataan Orang Tua",
  ]

  const steps = [
    {
      icon: FileText,
      title: "Lengkapi Formulir",
      description: "Isi formulir pendaftaran dengan data yang lengkap dan benar",
    },
    {
      icon: Users,
      title: "Tes Seleksi",
      description: "Mengikuti tes wawancara dan tes kemampuan dasar",
    },
    {
      icon: CheckCircle,
      title: "Pengumuman",
      description: "Pengumuman hasil seleksi akan diumumkan via website",
    },
  ]

  return (
    <section id="daftar" className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-green-800 mb-4">Pendaftaran Santri Baru</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bergabunglah dengan keluarga besar Pondok Pesantren DARUL HIKAM dan wujudkan impian menjadi generasi
            Qur'ani.
          </p>
        </div>

        {/* Registration Steps */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Registration Form */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Formulir Pendaftaran
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Nama Lengkap</label>
                  <Input placeholder="Nama lengkap calon santri" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Tempat Lahir</label>
                  <Input placeholder="Tempat lahir" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Tanggal Lahir</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Jenis Kelamin</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Program yang Dipilih</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tahfidz">Tahfidz Al-Qur'an</SelectItem>
                    <SelectItem value="mts">Madrasah Tsanawiyah</SelectItem>
                    <SelectItem value="ma">Madrasah Aliyah</SelectItem>
                    <SelectItem value="bahasa-arab">Program Bahasa Arab</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Alamat Lengkap</label>
                <Textarea placeholder="Alamat lengkap calon santri" rows={3} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Nama Ayah</label>
                  <Input placeholder="Nama ayah" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Nama Ibu</label>
                  <Input placeholder="Nama ibu" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">No. Telepon Orang Tua</label>
                  <Input placeholder="Nomor telepon" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                  <Input type="email" placeholder="Email orang tua" />
                </div>
              </div>

              <Button className="w-full bg-green-700 hover:bg-green-800">Daftar Sekarang</Button>
            </CardContent>
          </Card>

          {/* Requirements */}
          <div className="space-y-8">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Persyaratan Pendaftaran</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Informasi Penting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Periode Pendaftaran</h4>
                  <p className="text-gray-700">1 Januari - 31 Maret 2024</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Biaya Pendaftaran</h4>
                  <p className="text-gray-700">Rp 200.000 (non-refundable)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Tes Seleksi</h4>
                  <p className="text-gray-700">15-20 April 2024</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Pengumuman</h4>
                  <p className="text-gray-700">25 April 2024</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
