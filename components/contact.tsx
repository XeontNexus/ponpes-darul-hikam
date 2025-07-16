import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Contact() {
  return (
    <section id="kontak" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-green-800 mb-4">Hubungi Kami</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan atau ingin mendapatkan informasi lebih
            lanjut.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-green-800 mb-6">Informasi Kontak</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">Alamat</h4>
                    <p className="text-gray-600">
                      Jl. Raya Pesantren No. 123
                      <br />
                      Bogor, Jawa Barat 16610
                      <br />
                      Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">Telepon</h4>
                    <p className="text-gray-600">
                      (021) 123-4567
                      <br />
                      +62 812-3456-7890
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">Email</h4>
                    <p className="text-gray-600">
                      info@pondokpesantren.ac.id
                      <br />
                      pendaftaran@pondokpesantren.ac.id
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">Jam Operasional</h4>
                    <p className="text-gray-600">
                      Senin - Jumat: 08:00 - 16:00
                      <br />
                      Sabtu: 08:00 - 12:00
                      <br />
                      Minggu: Tutup
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Kirim Pesan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Nama Lengkap</label>
                  <Input placeholder="Masukkan nama lengkap" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                  <Input type="email" placeholder="Masukkan email" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Nomor Telepon</label>
                <Input placeholder="Masukkan nomor telepon" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Subjek</label>
                <Input placeholder="Masukkan subjek pesan" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Pesan</label>
                <Textarea placeholder="Tulis pesan Anda di sini..." rows={5} />
              </div>
              <Button className="w-full bg-green-700 hover:bg-green-800">Kirim Pesan</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
