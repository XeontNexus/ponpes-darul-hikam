"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronDown, Facebook, Instagram, Youtube } from "lucide-react"
import Image from "next/image"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.068-.102a2.895 2.895 0 0 1 2.373-4.507c.287 0 .564.043.826.121V9.38a6.335 6.335 0 0 0-.826-.054C6.012 9.326 3.2 12.138 3.2 15.603 3.2 19.068 6.012 21.88 9.477 21.88c3.464 0 6.277-2.812 6.277-6.277V8.583a8.21 8.21 0 0 0 4.835 1.547V6.686h-1Z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

interface HomeProps {
  isAdmin?: boolean
  setActiveSection?: (section: string) => void
}

interface BannerItem {
  id: number
  title: string
  subtitle: string
  image: string
}

export function Home({ isAdmin = false, setActiveSection }: HomeProps) {
  // Banner Carousel State (Max 5 photos)
  const DEFAULT_BANNERS: BannerItem[] = [
    { id: 1, title: "Lingkungan Asri & Islami", subtitle: "Kampus Pondok Pesantren Darul Hikam yang megah, nyaman, dan mendukung suasana belajar santri.", image: "/images/banner1.png" },
    { id: 2, title: "Pendidikan Al-Qur'an & Tahfizh", subtitle: "Mencetak santri berjiwa Qur'ani dengan pemahaman keagamaan yang kuat dan mendalam.", image: "/images/banner2.png" },
    { id: 3, title: "Gerbang Utama & Kemegahan Pesantren", subtitle: "Pusat peradaban ilmu dan akhlak mulia bagi generasi muda Islam Indonesia.", image: "/images/banner3.png" },
    { id: 4, title: "Masjid Utama Darul Hikam", subtitle: "Pusat kegiatan ibadah jamaah dan kajian keislaman seluruh santri.", image: "/images/banner4.png" },
    { id: 5, title: "Fasilitas Belajar & Teknologi Modern", subtitle: "Mengintegrasikan ilmu syariat dan sains teknologi modern untuk masa depan santri.", image: "/images/banner5.png" },
  ]

  const [bannerItems, setBannerItems] = useState<BannerItem[]>(DEFAULT_BANNERS)
  const [settings, setSettings] = useState({
    title: "Selamat Datang di",
    subtitle: "PONDOK PESANTREN DARUL HIKAM",
    paragraph: "Lembaga pendidikan Islam terpadu yang telah berdiri sejak 1990 di Rimbo Ulu Tebo, berkomitmen membentuk generasi yang berakhlak mulia, cerdas, dan berwawasan global.",
    sejarahSingkatParagraph: "Yayasan Pondok Pesantren Darul Hikam didirikan pada tahun 1990 oleh KH. Rifai Ahmad, S.Pd.I bersama Ibu Hj. Harni. Pesantren ini berlokasi di Jl. Teratai, Desa Suka Damai, Kecamatan Rimbo Ulu, Kabupaten Tebo, Jambi.",
    sejarahLainnyaParagraph: "Dalam perkembangannya, Pondok Pesantren Darul Hikam menyelenggarakan sistem pendidikan integratif antara ilmu agama (kepesantrenan non-formal) dan ilmu umum formal (MTs sejak 2001 & MA sejak 2004) yang kini menaungi sekitar 900 santri."
  })

  useEffect(() => {
    fetch("/api/banners")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setBannerItems(data)
        // else keep the default banners
      })
      .catch(() => { /* keep default banners on error */ })

    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setSettings({
            title: data.heroTitle || "Selamat Datang di",
            subtitle: data.heroSubtitle || "PONDOK PESANTREN DARUL HIKAM",
            paragraph: data.heroParagraph || "Lembaga pendidikan Islam terpadu yang telah berdiri sejak 1990 di Rimbo Ulu Tebo, berkomitmen membentuk generasi yang berakhlak mulia, cerdas, dan berwawasan global.",
            sejarahSingkatParagraph: data.sejarahSingkatParagraph || "Yayasan Pondok Pesantren Darul Hikam didirikan pada tahun 1990 oleh KH. Rifai Ahmad, S.Pd.I bersama Ibu Hj. Harni. Pesantren ini berlokasi di Jl. Teratai, Desa Suka Damai, Kecamatan Rimbo Ulu, Kabupaten Tebo, Jambi.",
            sejarahLainnyaParagraph: data.sejarahLainnyaParagraph || "Dalam perkembangannya, Pondok Pesantren Darul Hikam menyelenggarakan sistem pendidikan integratif antara ilmu agama (kepesantrenan non-formal) dan ilmu umum formal (MTs sejak 2001 & MA sejak 2004) yang kini menaungi sekitar 900 santri."
          })
        }
      })
      .catch(() => { /* keep default settings on error */ })
  }, [])

  const [currentBanner, setCurrentBanner] = useState(0)

  // Auto slide banner per 6 detik
  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerItems.length)
    }, 6000)

    return () => {
      clearInterval(bannerTimer)
    }
  }, [bannerItems.length])

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % bannerItems.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + bannerItems.length) % bannerItems.length)
  }

  return (
    <section className="pb-16 sm:pb-20 bg-gradient-to-b from-green-50 to-white animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-700 ease-out">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section 1 Layar Penuh (Full Viewport Height) */}
        <div className="min-h-[calc(100vh-76px)] flex flex-col justify-center items-center text-center relative py-8 sm:py-12">
          {/* Subtle Ambient Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] lg:w-[850px] h-[280px] sm:h-[400px] bg-gradient-to-tr from-emerald-200/50 via-green-100/40 to-emerald-300/20 rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* Main Hero Title & Content */}
          <div className="max-w-4xl mx-auto px-4 my-auto">
            <p className="text-base sm:text-lg md:text-xl font-bold tracking-widest text-emerald-800 uppercase mb-3 sm:mb-4">
              {settings.title}
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] mb-5 sm:mb-7">
              <span className="bg-gradient-to-r from-green-950 via-emerald-800 to-green-900 bg-clip-text text-transparent drop-shadow-sm">
                {settings.subtitle}
              </span>
            </h1>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
              <div className="h-[2px] w-14 sm:w-24 bg-gradient-to-r from-transparent to-emerald-400" />
              <div className="w-3 h-3 rotate-45 bg-emerald-600 rounded-sm shadow-sm" />
              <div className="h-[2px] w-14 sm:w-24 bg-gradient-to-l from-transparent to-emerald-400" />
            </div>

            {/* Subtitle / Sambutan */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-normal px-2">
              {settings.paragraph}
            </p>
          </div>

          {/* Indikator Gulir / Scroll Cue ke Bawah */}
          <div
            className="mt-auto pt-6 flex flex-col items-center gap-1.5 text-emerald-800/70 hover:text-emerald-800 transition-colors cursor-pointer select-none"
            onClick={() => {
              window.scrollBy({ top: window.innerHeight * 0.7, behavior: "smooth" })
            }}
          >
            <span className="text-xs uppercase tracking-widest font-semibold">Jelajahi Pesantren</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </div>

        {/* Banner Slide Section (Max 5 Foto Banner) - Sebelum Sejarah Singkat */}
        <div className="mb-14 sm:mb-18 max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-green-600/20 group h-[280px] sm:h-[400px] md:h-[480px]">
            {bannerItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentBanner ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title || "Banner"}
                  fill
                  priority={index === 0}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
                  <h3 className="text-xl sm:text-3xl font-bold mb-2 text-green-300 drop-shadow-md">{item.title}</h3>
                  <p className="text-sm sm:text-base text-gray-200 max-w-2xl leading-relaxed drop-shadow">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}

            {/* Navigation Arrows — minimal transparent */}
            <button
              onClick={prevBanner}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all"
              aria-label="Previous Banner"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-md" />
            </button>
            <button
              onClick={nextBanner}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all"
              aria-label="Next Banner"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-md" />
            </button>

            {/* Indicator Dashes (Hidden on mobile & medium screens to prevent text overlap) */}
            <div className="hidden md:flex absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 gap-1.5 sm:gap-2">
              {bannerItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentBanner(idx)}
                  className={`h-[3px] rounded-sm transition-all duration-300 ${
                    idx === currentBanner ? "w-7 bg-emerald-400" : "w-4 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sejarah Pondok Pesantren */}
        <div id="sejarah-section" className="max-w-4xl mx-auto mb-14 sm:mb-18 scroll-mt-24">
          <div className="bg-green-50/80 border-2 border-green-200 rounded-3xl p-6 sm:p-10 shadow-sm text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4 sm:mb-6">
              Sejarah Berdirinya Pondok Pesantren Darul Hikam
            </h2>
            <div className="space-y-4 sm:space-y-5 text-base sm:text-lg text-gray-700 leading-relaxed text-justify sm:text-center">
              <p>
                Yayasan Pondok Pesantren Darul Hikam didirikan pada tahun 1990 oleh KH. Rifai Ahmad, S.Pd.I bersama Ibu Hj. Harni. Pesantren ini berlokasi di Jl. Teratai, Desa Suka Damai, Kecamatan Rimbo Ulu, Kabupaten Tebo, Jambi.
              </p>
              <p>
                Kisah berdirinya pesantren ini sangat inspiratif karena dimulai dari kondisi yang sangat sederhana, yakni berawal dari sebuah bangunan pondok sederhana dengan fasilitas dan perlengkapan seadanya. Pada angkatan pertama, pondok ini hanya mendidik 13 orang santri putra. Namun, berkat ketekunan dan kesabaran, ketiga belas santri pertama tersebut berhasil menyelesaikan pendidikan mereka dengan tingkat kelulusan 100%. Dari pondok sederhana tersebut, pesantren ini terus berkembang pesat hingga eksis sampai sekarang dan menaungi sekitar 900 santri.
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-green-900 mt-8 sm:mt-10 mb-4">
              Pendidikan dan Ilmu yang Diajarkan
            </h3>
            <div className="space-y-4 sm:space-y-5 text-base sm:text-lg text-gray-700 leading-relaxed text-justify sm:text-center">
              <p>
                Dalam perkembangannya, Pondok Pesantren Darul Hikam menyelenggarakan sistem pendidikan yang mengintegrasikan antara <strong>ilmu agama</strong> dan <strong>ilmu umum</strong> melalui <strong>Pendidikan Non-Formal (Kepesantrenan)</strong> dan <strong>Pendidikan Formal (Ilmu Umum dan Agama terpadu)</strong>.
              </p>
              <p>
                Melalui <strong>Pendidikan Non-Formal (Kepesantrenan)</strong>, santri dididik ilmu-ilmu agama Islam (Tafaqquh Fiddin) khas pesantren untuk mencetak generasi yang berakhlak mulia dan mendalami ajaran agama.
              </p>
              <p>
                <strong>Dan</strong> melalui <strong>Pendidikan Formal (Ilmu Umum dan Agama terpadu)</strong>, yayasan memfasilitasi santri agar juga menguasai ilmu pengetahuan umum dengan mendirikan lembaga pendidikan formal tingkat menengah, yaitu didirikannya Madrasah Tsanawiyah (MTs) pada tahun 2001 dengan jumlah murid angkatan pertama sebanyak 15 orang, serta dilanjutkan dengan berdirinya Madrasah Aliyah (MA) pada tahun 2004 dengan murid angkatan pertama sebanyak 20 orang.
              </p>
              <p>
                Dengan tersedianya lembaga pendidikan formal dan non-formal di dalam satu kawasan, para santri dimudahkan untuk menuntut ilmu secara seimbang, baik ilmu agama kepesantrenan maupun ilmu pengetahuan umum dari madrasah.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-14 sm:mt-20 bg-green-50/80 border-2 border-green-200 rounded-3xl overflow-hidden shadow-lg max-w-5xl mx-auto">
          {/* Foto Banner di atas tulisan */}
          <div className="relative h-[220px] sm:h-[320px] md:h-[380px] w-full">
            <Image
              src="/images/banner1.png"
              alt="Pondok Pesantren Darul Hikam"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-black/20 to-transparent" />
          </div>

          <div className="text-center p-6 sm:p-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-green-900 mb-3 sm:mb-4">
              Bergabunglah dengan Keluarga Besar Kami
            </h3>
            <p className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Daftarkan putra-putri Anda untuk menjadi bagian dari generasi Qur'ani yang berakhlak mulia dan berprestasi.
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={() => {
                  if (setActiveSection) {
                    setActiveSection("pendaftaran")
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                }}
                className="bg-green-700 hover:bg-green-800 text-white px-8 sm:px-10 py-3.5 sm:py-4 text-base rounded-2xl font-bold shadow-md transition-all hover:scale-105"
              >
                Daftar Santri Baru
              </Button>
            </div>
          </div>
        </div>

        {/* SALURAN WHATSAPP & TOKOH / MASKOT IMUT PONPES */}
        <div className="mt-14 sm:mt-20 max-w-5xl mx-auto">
          {/* Card Ajakan Saluran WA */}
          <div className="bg-gradient-to-br from-emerald-800 via-green-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-emerald-500/30 text-center relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-10 -top-10 w-44 h-44 bg-green-400/10 rounded-full blur-2xl pointer-events-none" />

            {/* Badge Saluran */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold mb-4 backdrop-blur-sm">
              <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
              Saluran Resmi WhatsApp Pesantren
            </div>

            {/* Tulisan Ajakan */}
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Ikuti Saluran PONPES DARUL HIKAM di WhatsApp
            </h3>
            <p className="text-green-100/90 text-sm sm:text-base max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Dapatkan informasi terkini seputar kegiatan harian santri, jadwal kajian, pengumuman penting, mutiara hikmah, dan prestasi santri langsung di WhatsApp Anda.
            </p>

            {/* Tombol Link Saluran WA */}
            <div className="flex justify-center mb-10">
              <a
                href="https://whatsapp.com/channel/0029Vb5CIK6DzgTCAQYTTS1R"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-base sm:text-lg px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 ring-4 ring-[#25D366]/30 group"
              >
                <WhatsAppIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Gabung Saluran WhatsApp Kami</span>
                <span className="text-white/80 group-hover:translate-x-1 transition-transform">➔</span>
              </a>
            </div>

            {/* Bagian Akun Media Sosial Resmi Ponpes */}
            <div className="pt-8 border-t border-emerald-700/60">
              <h4 className="text-sm sm:text-base font-extrabold text-emerald-300 uppercase tracking-wider mb-2">
                Media Sosial Resmi Pondok Pesantren
              </h4>
              <p className="text-xs sm:text-sm text-green-200/80 max-w-xl mx-auto mb-6">
                Ikuti seluruh akun resmi media sosial kami untuk mendapatkan update berita, siaran dakwah, dan informasi kegiatan santri.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                {/* 1. YouTube */}
                <a
                  href="https://youtube.com/@darulhikamtv?si=5rPvykoMigMg44NQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-red-500/20 border border-emerald-400/30 hover:border-red-400 rounded-2xl p-4 transition-all duration-300 hover:scale-105 shadow-md flex flex-col justify-between group"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                      <Youtube className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-extrabold text-white text-sm group-hover:text-red-300 transition-colors">
                        YouTube
                      </h5>
                      <p className="text-[11px] text-green-300 truncate font-mono">
                        @darulhikamtv
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-green-100/70 leading-relaxed">
                    Kajian kitab, ceramah ustadz, dan video dokumentasi santri.
                  </p>
                </a>

                {/* 2. Instagram */}
                <a
                  href="https://www.instagram.com/darulhikam.sukadamai?igsh=YXduN2Z2NDFlM3l5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-pink-500/20 border border-emerald-400/30 hover:border-pink-400 rounded-2xl p-4 transition-all duration-300 hover:scale-105 shadow-md flex flex-col justify-between group"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-extrabold text-white text-sm group-hover:text-pink-300 transition-colors">
                        Instagram
                      </h5>
                      <p className="text-[11px] text-green-300 truncate font-mono">
                        @darulhikam.sukadamai
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-green-100/70 leading-relaxed">
                    Galeri foto kegiatan harian, prestasi santri, &amp; agenda pondok.
                  </p>
                </a>

                {/* 3. TikTok */}
                <a
                  href="https://www.tiktok.com/@darulhikamtebo?_r=1&_t=ZS-98jjgRchKGw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-cyan-500/20 border border-emerald-400/30 hover:border-cyan-400 rounded-2xl p-4 transition-all duration-300 hover:scale-105 shadow-md flex flex-col justify-between group"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform border border-white/20">
                      <TikTokIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-extrabold text-white text-sm group-hover:text-cyan-300 transition-colors">
                        TikTok
                      </h5>
                      <p className="text-[11px] text-green-300 truncate font-mono">
                        @darulhikamtebo
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-green-100/70 leading-relaxed">
                    Video kreatif edukatif, keseharian santri, &amp; pesan kebaikan.
                  </p>
                </a>

                {/* 4. Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=100081803812314&mibextid=rS40aB7S9Ucbxw6v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-blue-500/20 border border-emerald-400/30 hover:border-blue-400 rounded-2xl p-4 transition-all duration-300 hover:scale-105 shadow-md flex flex-col justify-between group"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-extrabold text-white text-sm group-hover:text-blue-300 transition-colors">
                        Facebook
                      </h5>
                      <p className="text-[11px] text-green-300 truncate font-mono">
                        Ponpes Darul Hikam
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-green-100/70 leading-relaxed">
                    Berita resmi pesantren, artikel dakwah, &amp; informasi santri baru.
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
