import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-green-800 font-bold text-sm lg:text-base">DH</span>
              </div>
              <div>
                <h3 className="font-bold text-base lg:text-lg">Pondok Pesantren</h3>
                <p className="text-green-200 text-xs lg:text-sm">DARUL HIKAM</p>
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              Lembaga pendidikan Islam yang berkomitmen untuk membentuk generasi yang berakhlak mulia dan berwawasan
              global.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Menu Utama</h4>
            <ul className="space-y-2 text-green-200">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Prestasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Organisasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Santri
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Info Lainnya
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Program</h4>
            <ul className="space-y-2 text-green-200">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  PAUD
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  SD/IT
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  MTs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  MA
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  SMK
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Kontak</h4>
            <div className="space-y-3 text-green-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-sm">
                  Jl. Raya Pesantren No. 123
                  <br />
                  Bogor, Jawa Barat 16610
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">(021) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">info@darulhikam.ac.id</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p className="text-green-200 text-sm">
            &copy; {new Date().getFullYear()} Pondok Pesantren DARUL HIKAM. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
