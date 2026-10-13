import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Sparkles } from "lucide-react"
import Image from "next/image"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.068-.102a2.895 2.895 0 0 1 2.373-4.507c.287 0 .564.043.826.121V9.38a6.335 6.335 0 0 0-.826-.054C6.012 9.326 3.2 12.138 3.2 15.603 3.2 19.068 6.012 21.88 9.477 21.88c3.464 0 6.277-2.812 6.277-6.277V8.583a8.21 8.21 0 0 0 4.835 1.547V6.686h-1Z" />
    </svg>
  )
}

interface FooterProps {
  setActiveSection?: (section: string) => void
}

export function Footer({ setActiveSection }: FooterProps) {
  const handleNav = (sectionId: string) => {
    if (setActiveSection) {
      setActiveSection(sectionId)
    }
  }

  return (
    <footer className="bg-gradient-to-b from-green-900 via-green-950 to-black text-white border-t border-green-800/60 shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Col 1: Branding & Intro */}
          <div className="space-y-4">
            <div
              onClick={() => handleNav("home")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="p-1.5 bg-white rounded-xl shadow-md ring-2 ring-emerald-400/40 flex-shrink-0 group-hover:scale-105 transition-transform">
                <Image
                  src="/images/logo-darul-hikam.png"
                  alt="Logo Pondok Pesantren DARUL HIKAM"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-base lg:text-lg tracking-tight text-white leading-tight group-hover:text-emerald-300 transition-colors">
                  DARUL HIKAM
                </h3>
                <p className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Membentuk Generasi Qur'ani
                </p>
              </div>
            </div>
            <p className="text-green-200/80 text-xs sm:text-sm leading-relaxed">
              Lembaga pendidikan Islam terpadu yang berkomitmen membentuk generasi yang berakhlak mulia, cerdas, berilmu syariat, dan berwawasan global.
            </p>
            <div className="flex gap-3 pt-1">
              <a
                href="https://www.facebook.com/profile.php?id=100081803812314&mibextid=rS40aB7S9Ucbxw6v"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 bg-green-800/80 text-green-200 hover:bg-emerald-400 hover:text-green-950 rounded-xl flex items-center justify-center transition-all duration-300 shadow hover:scale-110"
              >
                <Facebook className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://www.instagram.com/darulhikam.sukadamai?igsh=YXduN2Z2NDFlM3l5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 bg-green-800/80 text-green-200 hover:bg-emerald-400 hover:text-green-950 rounded-xl flex items-center justify-center transition-all duration-300 shadow hover:scale-110"
              >
                <Instagram className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://youtube.com/@darulhikamtv?si=5rPvykoMigMg44NQ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Youtube"
                className="w-9 h-9 bg-green-800/80 text-green-200 hover:bg-emerald-400 hover:text-green-950 rounded-xl flex items-center justify-center transition-all duration-300 shadow hover:scale-110"
              >
                <Youtube className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://www.tiktok.com/@darulhikamtebo?_r=1&_t=ZS-98jjgRchKGw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 bg-green-800/80 text-green-200 hover:bg-emerald-400 hover:text-green-950 rounded-xl flex items-center justify-center transition-all duration-300 shadow hover:scale-110"
              >
                <TikTokIcon className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

          {/* Col 2: Menu Utama */}
          <div>
            <h4 className="font-bold text-base sm:text-lg text-emerald-300 mb-4 border-b border-green-800/80 pb-2 w-fit">
              Menu Utama
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-green-200/80">
              <li>
                <button onClick={() => handleNav("home")} className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("prestasi")} className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Pencapaian
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("organisasi")} className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Pengajar
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("santri")} className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Dunia Santri
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("pendaftaran")} className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-left font-semibold text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Pendaftaran Santri Baru
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Program Pendidikan */}
          <div>
            <h4 className="font-bold text-base sm:text-lg text-emerald-300 mb-4 border-b border-green-800/80 pb-2 w-fit">
              Program Pendidikan
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-green-200/80">
              <li className="hover:text-emerald-300 transition-colors">PAUD & RA Islami</li>
              <li className="hover:text-emerald-300 transition-colors">Madrasah Tsanawiyah (MTs)</li>
              <li className="hover:text-emerald-300 transition-colors">Madrasah Aliyah (MA)</li>
              <li className="hover:text-emerald-300 transition-colors">SMK Darul Hikam</li>
              <li className="hover:text-emerald-300 transition-colors">Program Tahfizh Al-Qur'an</li>
              <li className="hover:text-emerald-300 transition-colors">Madrasah Diniyah & Kitab Kuning</li>
            </ul>
          </div>

          {/* Col 4: Kontak & Alamat */}
          <div>
            <h4 className="font-bold text-base sm:text-lg text-emerald-300 mb-4 border-b border-green-800/80 pb-2 w-fit">
              Kontak & Alamat
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-green-200/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  Jl. Raya Pesantren Pondok Darul Hikam, Tebo, Indonesia
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />
                <span>0812-7162-9771 / 0822-6898-1370</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />
                <span>info@darulhikam.sch.id</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Footer Bar */}
        <div className="border-t border-green-800/60 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-green-300/70 gap-3">
          <p>© {new Date().getFullYear()} Pondok Pesantren DARUL HIKAM. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1 text-[11px] text-green-400/80">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Membentuk Generasi Qur'ani & Berilmu Syariat
          </p>
        </div>
      </div>
    </footer>
  )
}
