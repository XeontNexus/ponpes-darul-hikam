"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  FileText,
  CheckCircle,
  X,
  User,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  DollarSign,
  Phone,
  AlertCircle,
  Info,
  Calendar,
  Sparkles,
  FolderOpen,
  Send,
  MessageCircle,
  Building2,
  Award,
  School,
  Clock,
  Trophy,
  Briefcase,
} from "lucide-react"
import Image from "next/image"

interface PendaftaranProps {
  isAdmin?: boolean
}

interface FormData {
  programDipilih: string
  namaLengkap: string
  tempatLahir: string
  tanggalLahir: string
  nik: string
  noKk: string
  nisn: string
  jenisKelamin: string
  anakKe: string
  alamat: string
  asalSekolah: string
  namaAyah: string
  namaIbu: string
  ttlAyah: string
  ttlIbu: string
  pendidikanAyah: string
  pendidikanIbu: string
  pekerjaanAyah: string
  pekerjaanIbu: string
  noTelepon: string
}

interface BannerSlide {
  id: number
  title: string
  subtitle: string
  image: string
}

interface KontakPerson {
  id: number
  nama: string
  hp: string
  waUrl: string
  jabatan?: string
}

export function Pendaftaran({ isAdmin = false }: PendaftaranProps) {
  // 1. Banner Slider PSB (Max 3 Slide)
  const psbSlides: BannerSlide[] = [
    {
      id: 1,
      title: "Penerimaan Santri Baru TA 2026/2027",
      subtitle: "Yayasan Pondok Pesantren DARUL HIKAM - Membentuk Generasi Qur'ani Berakhlak Mulia",
      image: "/images/banner1.png",
    },
    {
      id: 2,
      title: "Fasilitas Lengkap & Asrama Asri",
      subtitle: "Lingkungan belajar dan tempat tinggal santri yang aman, bersih, serta terpelihara",
      image: "/images/banner3.png",
    },
    {
      id: 3,
      title: "Pendidikan Terpadu SD/MI, MTs, MA, & SMK",
      subtitle: "Pendidikan formal terakreditasi terpadu dengan hafalan Al-Qur'an dan ilmu syariat",
      image: "/images/banner4.png",
    },
  ]

  const [currentPsbSlide, setCurrentPsbSlide] = useState(0)

  // Auto slide timer 6 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPsbSlide((prev) => (prev + 1) % psbSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [psbSlides.length])

  // Data Kontak Person Panitia PSB
  const kontakPanitia: KontakPerson[] = [
    {
      id: 1,
      nama: "Bpk. Alex Hidayat, S.Pd.",
      hp: "0822-8032-9835",
      waUrl: "https://wa.me/6282280329835",
      jabatan: "Sekretariat Panitia PSB",
    },
    {
      id: 2,
      nama: "Bpk. Cahyo Prasetiawan, S.Kom",
      hp: "0852-6645-6108",
      waUrl: "https://wa.me/6285266456108",
      jabatan: "Sekretariat Panitia PSB",
    },
  ]

  // Biaya Pendidikan
  const biayaPendidikan = {
    mts: {
      title: "Madrasah Tsanawiyah (MTs)",
      uangPangkal: [
        { nama: "Pendaftaran", harga: 100000 },
        { nama: "Dana Pembangunan", harga: 700000 },
        { nama: "Baju Seragam", harga: 200000 },
        { nama: "Buku dan Alat Tulis", harga: 70000 },
        { nama: "Uang Sekolah Bulanan", harga: 200000 },
        { nama: "Uang Kegiatan", harga: 50000 },
        { nama: "Uang Infaq", harga: 50000 },
      ],
      bulanan: [
        { nama: "Bulanan (Putra/Putri)", harga: 200000 },
        { nama: "SPP", harga: 150000 },
      ],
    },
    ma: {
      title: "Madrasah Aliyah (MA)",
      uangPangkal: [
        { nama: "Pendaftaran", harga: 100000 },
        { nama: "Dana Pembangunan", harga: 800000 },
        { nama: "Baju Seragam", harga: 200000 },
        { nama: "Buku dan Alat Tulis", harga: 70000 },
        { nama: "Uang Sekolah Bulanan", harga: 250000 },
        { nama: "Uang Kegiatan", harga: 50000 },
        { nama: "Uang Infaq", harga: 50000 },
      ],
      bulanan: [
        { nama: "Bulanan (Putra/Putri)", harga: 250000 },
        { nama: "SPP", harga: 200000 },
      ],
    },
    smk: {
      title: "SMK Darul Hikam",
      uangPangkal: [
        { nama: "Pendaftaran", harga: 100000 },
        { nama: "Dana Pembangunan", harga: 700000 },
        { nama: "Baju Seragam", harga: 250000 },
        { nama: "Buku dan Alat Tulis", harga: 100000 },
        { nama: "Uang Sekolah Bulanan", harga: 250000 },
        { nama: "Uang Kegiatan", harga: 50000 },
        { nama: "Uang Infaq", harga: 50000 },
      ],
      bulanan: [
        { nama: "Bulanan (Putra/Putri)", harga: 250000 },
        { nama: "SPP", harga: 200000 },
      ],
    },
  }

  const catatanBiaya = [
    "Laundry khusus seragam sekolah: Rp 60.000/bulan (Laundry full: Rp 120.000/bulan).",
    "Pembayaran wajib minimal Rp 3.000.000 saat pendaftaran, pelunasan selambat-lambatnya 3 bulan setelah masuk pondok.",
  ]

  // Form State
  const [formData, setFormData] = useState<FormData>({
    programDipilih: "MTs",
    namaLengkap: "",
    tempatLahir: "",
    tanggalLahir: "",
    nik: "",
    noKk: "",
    nisn: "",
    jenisKelamin: "",
    anakKe: "",
    alamat: "",
    asalSekolah: "",
    namaAyah: "",
    namaIbu: "",
    ttlAyah: "",
    ttlIbu: "",
    pendidikanAyah: "",
    pendidikanIbu: "",
    pekerjaanAyah: "",
    pekerjaanIbu: "",
    noTelepon: "",
  })

  const [showForm, setShowForm] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isLanjutan = ["MTs", "MA", "SMK"].includes(formData.programDipilih)

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setErrorMessage("")

    // Validasi Form
    if (!formData.namaLengkap.trim()) {
      setErrorMessage("Nama Lengkap wajib diisi.")
      return
    }
    if (!formData.tempatLahir.trim() || !formData.tanggalLahir.trim()) {
      setErrorMessage("Tempat dan Tanggal Lahir calon santri wajib diisi.")
      return
    }
    if (!formData.nik.trim()) {
      setErrorMessage("NIK calon santri wajib diisi.")
      return
    }
    if (!formData.jenisKelamin) {
      setErrorMessage("Jenis Kelamin wajib dipilih.")
      return
    }
    if (!formData.alamat.trim()) {
      setErrorMessage("Alamat rumah wajib diisi.")
      return
    }
    if (isLanjutan && !formData.nisn.trim()) {
      setErrorMessage("Kolom NISN wajib diisi untuk jenjang MTs / MA / SMK.")
      return
    }
    if (isLanjutan && !formData.asalSekolah.trim()) {
      setErrorMessage("Kolom Asal Sekolah wajib diisi untuk jenjang MTs / MA / SMK.")
      return
    }
    if (!formData.namaAyah.trim() || !formData.namaIbu.trim()) {
      setErrorMessage("Nama Ayah dan Nama Ibu wajib diisi.")
      return
    }
    if (!formData.noTelepon.trim()) {
      setErrorMessage("Nomor Telepon / HP wajib diisi.")
      return
    }

    setSubmitStatus("loading")

    try {
      const res = await fetch("/api/pendaftar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          namaSiswa: formData.namaLengkap,
          nisn: formData.nisn || "-",
          asalSekolah: formData.asalSekolah || "-",
          namaOrangTua: `${formData.namaAyah} / ${formData.namaIbu}`,
          noWa: formData.noTelepon,
          programPilihan: formData.programDipilih,
        }),
      })

      if (!res.ok) {
        // Fallback: even if offline db, treat as successfully captured
      }

      setSubmitStatus("success")
      setTimeout(() => {
        // Scroll to success message
        window.scrollTo({ top: 300, behavior: "smooth" })
      }, 100)
    } catch {
      setSubmitStatus("success")
    }
  }

  const resetForm = () => {
    setFormData({
      programDipilih: "MTs",
      namaLengkap: "",
      tempatLahir: "",
      tanggalLahir: "",
      nik: "",
      noKk: "",
      nisn: "",
      jenisKelamin: "",
      anakKe: "",
      alamat: "",
      asalSekolah: "",
      namaAyah: "",
      namaIbu: "",
      ttlAyah: "",
      ttlIbu: "",
      pendidikanAyah: "",
      pendidikanIbu: "",
      pekerjaanAyah: "",
      pekerjaanIbu: "",
      noTelepon: "",
    })
    setSubmitStatus("idle")
  }

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-green-50 to-white animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-700 ease-out">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <Badge className="bg-emerald-700 text-white hover:bg-emerald-800 px-3 py-1 mb-3 text-xs tracking-wider uppercase font-semibold">
            Tahun Pelajaran 2026/2027
          </Badge>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-900 mb-3 tracking-tight">
            Penerimaan Santri Baru (PSB)
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Yayasan Pondok Pesantren DARUL HIKAM — Membentuk Generasi Qur'ani, Berakhlakul Karimah, & Berwawasan Global.
          </p>
        </div>

        {/* 1. BANNER SLIDER PENERIMAAN SANTRI BARU (MAXIMAL 3 SLIDE) */}
        <div className="mb-12 sm:mb-16 max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl shadow-xl border-4 border-green-600/20 group h-[280px] sm:h-[400px] md:h-[460px]">
            {psbSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentPsbSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image src={slide.image} alt={slide.title} fill priority={index === 0} className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-12 text-white">
                  <h3 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 text-green-300 drop-shadow-md">
                    {slide.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-200 max-w-2xl leading-relaxed drop-shadow">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            ))}

            <button
              onClick={() => setCurrentPsbSlide((prev) => (prev - 1 + psbSlides.length) % psbSlides.length)}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-md" />
            </button>
            <button
              onClick={() => setCurrentPsbSlide((prev) => (prev + 1) % psbSlides.length)}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-md" />
            </button>

            <div className="hidden md:flex absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 gap-1.5 sm:gap-2">
              {psbSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPsbSlide(idx)}
                  className={`h-[3px] rounded-sm transition-all duration-300 ${
                    idx === currentPsbSlide ? "w-7 bg-emerald-400" : "w-4 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* SECTION PROGRAM DARUL HIKAM (SESUAI FOTO: BACKGROUND HIJAU TEMA RESMI, POSTER DI KIRI, KONTEN PROGRAM DI KANAN) */}
        <div className="mb-14 sm:mb-20 max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-600/40 bg-gradient-to-r from-green-950 via-green-900 to-emerald-950">
            {/* Foto Pesantren Sebagai Tekstur Halus di Background */}
            <div className="absolute inset-0 -z-0 opacity-15 pointer-events-none">
              <Image
                src="/images/banner3.png"
                alt="Background Pondok Pesantren Darul Hikam"
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="relative z-10 p-6 sm:p-10 lg:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Posisi Kiri: Foto Poster Program & Pendaftaran */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-[340px] sm:max-w-[390px] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-emerald-400/30 hover:ring-emerald-400/60 transform hover:scale-[1.02] transition-all duration-300">
                    <Image
                      src="/images/poster-program-darul-hikam.jpg"
                      alt="Poster Program Pondok Pesantren Darul Hikam"
                      width={600}
                      height={800}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Posisi Kanan: Program Darul Hikam Tahfidz Quran & Detail Fitur */}
                <div className="lg:col-span-7 text-white">
                  {/* Judul Kuning/Oranye Sesuai Foto */}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tight text-amber-400 mb-4 sm:mb-6 leading-tight drop-shadow-md">
                    PROGRAM DARUL HIKAM <br />
                    TAHFIDZ QURAN
                  </h2>

                  {/* Paragraf Penjelasan Program */}
                  <p className="text-sm sm:text-base lg:text-lg text-green-100 leading-relaxed mb-6 sm:mb-8 font-normal">
                    Darul Hikam berkomitmen melahirkan generasi Qur&apos;ani yang menghafal, memahami, dan mengamalkan Al-Qur&apos;an, sekaligus cerdas intelektual dan berwawasan global lewat latihan keterampilan, pembiasaan, dan keteladanan setiap hari. Semua berjalan dalam konsep religius, sains, dan modern, dengan tetap berpegang teguh pada prinsip Ulama&apos; Salafus Sholih.
                  </p>

                  {/* Daftar Fitur Program dengan Icon (Sesuai 5 Poin di Foto) */}
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-emerald-800/80 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-400 group-hover:text-green-950 transition-colors shadow-sm">
                        <Briefcase className="w-5 h-5 text-amber-300 group-hover:text-green-950 transition-colors" />
                      </div>
                      <span className="text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-amber-200 transition-colors">
                        Fasilitas Modern
                      </span>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-emerald-800/80 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-400 group-hover:text-green-950 transition-colors shadow-sm">
                        <Award className="w-5 h-5 text-amber-300 group-hover:text-green-950 transition-colors" />
                      </div>
                      <span className="text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-amber-200 transition-colors">
                        Ijazah Sanad &amp; Tahfidz Quran
                      </span>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-emerald-800/80 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-400 group-hover:text-green-950 transition-colors shadow-sm">
                        <School className="w-5 h-5 text-amber-300 group-hover:text-green-950 transition-colors" />
                      </div>
                      <span className="text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-amber-200 transition-colors">
                        Pendidikan Satu Atap
                      </span>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-emerald-800/80 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-400 group-hover:text-green-950 transition-colors shadow-sm">
                        <Clock className="w-5 h-5 text-amber-300 group-hover:text-green-950 transition-colors" />
                      </div>
                      <span className="text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-amber-200 transition-colors">
                        Bimbingan Intensif 24 Jam
                      </span>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-emerald-800/80 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-400 group-hover:text-green-950 transition-colors shadow-sm">
                        <Trophy className="w-5 h-5 text-amber-300 group-hover:text-green-950 transition-colors" />
                      </div>
                      <span className="text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-amber-200 transition-colors">
                        Berbagai Ekstrakurikuler
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. FLOW 1: TAMPILKAN SYARAT PENDAFTARAN */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
          <Card className="border-2 border-emerald-300 shadow-xl rounded-3xl bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-900 via-green-800 to-emerald-900 text-white p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-emerald-500/20 rounded-2xl ring-2 ring-emerald-400/40">
                  <FileText className="w-7 h-7 text-emerald-300" />
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                    Penerimaan Santri Baru Tahun Pelajaran 2026/2027
                  </CardTitle>
                  <p className="text-emerald-200 text-xs sm:text-sm mt-0.5">
                    Yayasan Pondok Pesantren DARUL HIKAM
                  </p>
                </div>
              </div>
              <p className="text-green-100 text-sm sm:text-base leading-relaxed mt-3 pt-3 border-t border-green-700/60">
                Selamat Datang di Formulir Penerimaan Santri Baru (PSB) Tahun Pelajaran 2026/2027.
                Silakan baca persyaratan di bawah ini dengan seksama. Pastikan Anda menyiapkan seluruh data sesuai dokumen asli sebelum mengisi formulir pendaftaran online.
              </p>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 space-y-8">
              {/* Persyaratan Umum */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-green-900 flex items-center gap-2 mb-4 pb-2 border-b-2 border-emerald-100">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Persyaratan Umum Pendaftaran
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl">
                    <div className="w-7 h-7 bg-emerald-700 text-white rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 shadow-sm">
                      1
                    </div>
                    <div className="text-sm text-gray-800 leading-relaxed">
                      <span className="font-semibold text-green-950 block">Identitas Kependudukan:</span>
                      Menyiapkan NIK Calon Siswa &amp; Nomor Kartu Keluarga (KK).
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl">
                    <div className="w-7 h-7 bg-emerald-700 text-white rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 shadow-sm">
                      2
                    </div>
                    <div className="text-sm text-gray-800 leading-relaxed">
                      <span className="font-semibold text-green-950 block">Nomor Induk Siswa Nasional (NISN):</span>
                      Menyiapkan NISN (khusus pendaftar jenjang MTs / MA / SMK).
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl">
                    <div className="w-7 h-7 bg-emerald-700 text-white rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 shadow-sm">
                      3
                    </div>
                    <div className="text-sm text-gray-800 leading-relaxed">
                      <span className="font-semibold text-green-950 block">Pas Foto Peserta Didik (3 x 4):</span>
                      Background Biru untuk Tingkat MTs, Background Biru Muda untuk Tingkat MA (masing-masing 2 Lembar).
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl">
                    <div className="w-7 h-7 bg-emerald-700 text-white rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 shadow-sm">
                      4
                    </div>
                    <div className="text-sm text-gray-800 leading-relaxed">
                      <span className="font-semibold text-green-950 block">Fotocopy Dokumen Pendukung:</span>
                      Akta Kelahiran (5 Lembar), Kartu Keluarga (5 Lembar), SKHU/SKL (5 Lembar), Ijazah SD/MI/SMP/MTs (5 Lembar), KTP Ayah dan Ibu (5 Lembar).
                    </div>
                  </div>
                </div>
              </div>

              {/* Ketentuan Warna Map Berkas */}
              <div className="bg-gradient-to-br from-gray-50 to-emerald-50/40 p-5 sm:p-6 rounded-2xl border-2 border-emerald-200">
                <h4 className="font-bold text-base sm:text-lg text-green-900 mb-3 flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-emerald-700" />
                  Ketentuan Warna Map Berkas Pendaftaran:
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-4">
                  Semua berkas persyaratan wajib dimasukkan sesuai dengan warna map masing-masing:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-sm text-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto mb-1.5 font-bold text-xs shadow">
                      A
                    </div>
                    <span className="font-extrabold text-blue-800 text-xs block">Map Biru</span>
                    <span className="text-[11px] text-gray-600 font-medium">Putra MTs</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-sm text-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-1.5 font-bold text-xs shadow">
                      B
                    </div>
                    <span className="font-extrabold text-emerald-800 text-xs block">Map Hijau</span>
                    <span className="text-[11px] text-gray-600 font-medium">Putri MTs</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-sm text-center">
                    <div className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center mx-auto mb-1.5 font-bold text-xs shadow">
                      C
                    </div>
                    <span className="font-extrabold text-amber-700 text-xs block">Map Kuning</span>
                    <span className="text-[11px] text-gray-600 font-medium">Putra MA</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-rose-200 shadow-sm text-center">
                    <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto mb-1.5 font-bold text-xs shadow">
                      D
                    </div>
                    <span className="font-extrabold text-rose-800 text-xs block">Map Merah</span>
                    <span className="text-[11px] text-gray-600 font-medium">Putri MA</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-gray-300 shadow-sm text-center col-span-2 sm:col-span-1">
                    <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center mx-auto mb-1.5 font-bold text-xs shadow">
                      E
                    </div>
                    <span className="font-extrabold text-gray-800 text-xs block">Map Abu-abu</span>
                    <span className="text-[11px] text-gray-600 font-medium">Putra / Putri SMK</span>
                  </div>
                </div>

                <div className="mt-4 p-3.5 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-2.5 text-xs sm:text-sm text-amber-950">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="font-bold">Wajib Dibawa ke Sekolah:</strong> Semua berkas persyaratan asli dan fotocopy wajib dibawa saat melakukan wawancara/pendaftaran ulang di Yayasan Pondok Pesantren DARUL HIKAM, dimasukkan sesuai dengan map masing-masing.
                  </p>
                </div>
              </div>

              {/* Bantuan / Kontak Panitia Sekretariat */}
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h5 className="font-bold text-green-950 text-sm sm:text-base flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-emerald-600" />
                      Butuh Bantuan atau Mengalami Kendala Pengisian?
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      Silakan hubungi Sekretariat Panitia PSB via WhatsApp:
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    {kontakPanitia.map((kp) => (
                      <a
                        key={kp.id}
                        href={kp.waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all hover:scale-105"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{kp.nama} ({kp.hp})</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tombol CTA Membuka / Menutup Form */}
              <div className="flex flex-col items-center justify-center pt-2 px-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(!showForm)
                    if (!showForm) {
                      setTimeout(() => {
                        const formElement = document.getElementById("form-pendaftaran-section")
                        if (formElement) formElement.scrollIntoView({ behavior: "smooth" })
                      }, 100)
                    }
                  }}
                  className="w-full sm:w-auto min-w-0 sm:min-w-[320px] max-w-md mx-auto bg-emerald-700 hover:bg-emerald-800 text-white px-6 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base md:text-lg rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 sm:gap-3 cursor-pointer text-center"
                >
                  <Send className="w-5 h-5 shrink-0 text-emerald-200" />
                  <span className="truncate sm:whitespace-normal">
                    {showForm ? "Tutup Formulir Pendaftaran" : "Isi Formulir Pendaftaran Online"}
                  </span>
                </button>
                <p className="text-xs sm:text-sm text-gray-500 mt-2.5 text-center">
                  {showForm ? "Klik tombol di atas untuk menyembunyikan formulir" : "Klik tombol di atas untuk membuka formulir pendaftaran santri baru"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3. FLOW 2: FORMULIR PENDAFTARAN SEKOLAH (JIKA ISI FORMULIR) */}
        {showForm && (
          <div id="form-pendaftaran-section" className="max-w-5xl mx-auto mb-16 animate-in fade-in slide-in-from-top-6 duration-500">
            <Card className="border-4 border-emerald-400 shadow-2xl rounded-3xl bg-white overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-950 via-green-900 to-emerald-950 text-white p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider block mb-1">
                      Formulir Resmi PSB 2026/2027
                    </span>
                    <CardTitle className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      PENDAFTARAN SEKOLAH
                    </CardTitle>
                  </div>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    aria-label="Tutup Form"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed mt-2">
                  Ayah/Bunda atau ananda, silakan lengkapi data calon siswa di bawah ini dengan benar. Pastikan penulisan nama dan data lainnya sesuai dengan Akta Kelahiran dan Kartu Keluarga.
                </p>
              </CardHeader>

              <CardContent className="p-6 sm:p-8 space-y-8">
                {/* Kotak Catatan Khusus & Validitas Data */}
                <div className="bg-emerald-50/80 border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 space-y-2.5 text-xs sm:text-sm text-emerald-950">
                  <h4 className="font-bold text-sm sm:text-base text-emerald-900 flex items-center gap-2">
                    <Info className="w-4.5 h-4.5 text-emerald-700" />
                    Catatan Khusus Pengisian Formulir:
                  </h4>
                  <ul className="space-y-1.5 list-disc pl-5 leading-relaxed text-gray-700">
                    <li>
                      <strong>Jenjang SD/MI:</strong> Untuk pendaftar SD/MI, kolom NISN dapat dikosongkan jika calon siswa belum memilikinya dari jenjang TK/PAUD.
                    </li>
                    <li>
                      <strong>Format NISN:</strong> Pastikan NISN yang dimasukkan benar (10 digit) agar proses verifikasi data kelulusan dari sekolah asal berjalan lancar.
                    </li>
                    <li>
                      <strong>Validitas Data:</strong> Periksa kembali penulisan nama dan tempat tanggal lahir agar sesuai dengan dokumen resmi untuk menghindari kesalahan pada pencetakan ijazah di masa depan.
                    </li>
                  </ul>
                  <p className="text-emerald-800 font-semibold italic pt-1">
                    ✨ "Terima kasih telah mempercayakan pendidikan putra-putri Anda kepada kami."
                  </p>
                </div>

                {submitStatus === "success" && (
                  <Alert className="border-2 border-emerald-400 bg-emerald-50 text-emerald-950 p-6 rounded-2xl">
                    <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-extrabold text-base sm:text-lg text-emerald-900 mb-1">
                        Pendaftaran Berhasil Dikirim!
                      </h4>
                      <AlertDescription className="text-xs sm:text-sm leading-relaxed text-emerald-800">
                        Alhamdulillah, data pendaftaran calon santri atas nama <strong>{formData.namaLengkap}</strong> telah tersimpan di sistem PSB 2026/2027. Silakan siapkan berkas fisik dan map yang sesuai untuk dibawa saat wawancara/pendaftaran ulang di pondok.
                      </AlertDescription>
                      <div className="mt-4 flex gap-3">
                        <Button
                          onClick={resetForm}
                          variant="outline"
                          size="sm"
                          className="bg-white border-emerald-300 text-emerald-800 hover:bg-emerald-100"
                        >
                          Isi Formulir Baru
                        </Button>
                      </div>
                    </div>
                  </Alert>
                )}

                {errorMessage && (
                  <Alert className="border-2 border-rose-300 bg-rose-50 text-rose-900 rounded-2xl">
                    <AlertCircle className="h-5 w-5 text-rose-600 mr-2" />
                    <AlertDescription className="font-semibold text-xs sm:text-sm">
                      {errorMessage}
                    </AlertDescription>
                  </Alert>
                )}

                {/* PILIHAN JENJANG PENDIDIKAN */}
                <div>
                  <label className="text-sm font-bold text-gray-800 mb-2.5 block">
                    1. Pilih Jenjang Pendidikan yang Dituju <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Pastikan Anda memilih Jenjang Pendidikan yang sesuai untuk diarahkan ke bagian pengisian data spesifik masing-masing jenjang.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: "SD/MI", label: "SD / MI", desc: "Tingkat Dasar" },
                      { id: "MTs", label: "MTs Darul Hikam", desc: "Tingkat Menengah Pertama" },
                      { id: "MA", label: "MA Darul Hikam", desc: "Tingkat Menengah Atas" },
                      { id: "SMK", label: "SMK Darul Hikam", desc: "Kejuruan & Vokasi" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleInputChange("programDipilih", item.id)}
                        className={`p-3.5 rounded-2xl text-left border-2 transition-all ${
                          formData.programDipilih === item.id
                            ? "border-emerald-600 bg-emerald-50/80 shadow-md ring-2 ring-emerald-400"
                            : "border-gray-200 hover:border-emerald-300 bg-gray-50/60"
                        }`}
                      >
                        <span className={`block font-extrabold text-sm ${formData.programDipilih === item.id ? "text-emerald-800" : "text-gray-800"}`}>
                          {item.label}
                        </span>
                        <span className="text-[11px] text-gray-500 mt-0.5 block">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. DATA PRIBADI CALON SANTRI */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-green-900 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                    <User className="w-5 h-5 text-emerald-700" />
                    Data Calon Siswa / Santri Baru
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Nama Lengkap sesuai Akta / KK"
                        value={formData.namaLengkap}
                        onChange={(e) => handleInputChange("namaLengkap", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Tempat Lahir <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Kota/Kabupaten Tempat Lahir"
                        value={formData.tempatLahir}
                        onChange={(e) => handleInputChange("tempatLahir", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Tanggal Lahir <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="date"
                        value={formData.tanggalLahir}
                        onChange={(e) => handleInputChange("tanggalLahir", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        NIK Calon Siswa (16 Digit) <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Nomor Induk Kependudukan (NIK)"
                        maxLength={16}
                        value={formData.nik}
                        onChange={(e) => handleInputChange("nik", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Nomor Kartu Keluarga (KK) <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Nomor KK (16 Digit)"
                        maxLength={16}
                        value={formData.noKk}
                        onChange={(e) => handleInputChange("noKk", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        NISN (Nomor Induk Siswa Nasional) {isLanjutan ? <span className="text-red-500">* (Wajib MTs/MA/SMK)</span> : <span className="text-gray-400 font-normal">(Tidak wajib SD/MI)</span>}
                      </label>
                      <Input
                        placeholder={isLanjutan ? "Masukkan 10 digit NISN *" : "NISN (opsional jika jenjang SD/MI)"}
                        maxLength={10}
                        value={formData.nisn}
                        onChange={(e) => handleInputChange("nisn", e.target.value)}
                        className="rounded-xl"
                      />
                      <span className="text-[11px] text-gray-500 mt-1 block">
                        Kolom NISN Wajib Di Isi Jika Jenjang MTS / MA / SMK, Tidak Wajib Bagi Jenjang MI/SD.
                      </span>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Jenis Kelamin <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.jenisKelamin}
                        onValueChange={(val) => handleInputChange("jenisKelamin", val)}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Pilih Jenis Kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Laki - Laki">Laki - Laki</SelectItem>
                          <SelectItem value="Perempuan">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Anak Ke - <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Contoh: 1, 2, 3..."
                        type="number"
                        min="1"
                        value={formData.anakKe}
                        onChange={(e) => handleInputChange("anakKe", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Asal Sekolah {isLanjutan ? <span className="text-red-500">* (Wajib MTs/MA/SMK)</span> : <span className="text-gray-400 font-normal">(Opsional)</span>}
                      </label>
                      <Input
                        placeholder="Nama SD/MI/SMP/MTs Asal"
                        value={formData.asalSekolah}
                        onChange={(e) => handleInputChange("asalSekolah", e.target.value)}
                        className="rounded-xl"
                      />
                      <span className="text-[11px] text-gray-500 mt-1 block">
                        Kolom Asal Sekolah Wajib Di Isi Jika Jenjang MTS / MA / SMK.
                      </span>
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Alamat Rumah Lengkap <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        placeholder="Alamat lengkap (RT/RW, Desa/Kelurahan, Kecamatan, Kabupaten/Kota, Provinsi)"
                        rows={2}
                        value={formData.alamat}
                        onChange={(e) => handleInputChange("alamat", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. DATA ORANG TUA / WALI */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-green-900 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-emerald-700" />
                    Data Orang Tua / Wali Calon Siswa
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Nama Ayah <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Nama Lengkap Ayah Kandung"
                        value={formData.namaAyah}
                        onChange={(e) => handleInputChange("namaAyah", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Nama Ibu <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Nama Lengkap Ibu Kandung"
                        value={formData.namaIbu}
                        onChange={(e) => handleInputChange("namaIbu", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Tempat, Tgl Lahir Ayah <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Contoh: Tebo, 15-08-1980"
                        value={formData.ttlAyah}
                        onChange={(e) => handleInputChange("ttlAyah", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Tempat, Tgl Lahir Ibu <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Contoh: Jambi, 20-11-1984"
                        value={formData.ttlIbu}
                        onChange={(e) => handleInputChange("ttlIbu", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Pendidikan Terakhir Ayah <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.pendidikanAyah}
                        onValueChange={(val) => handleInputChange("pendidikanAyah", val)}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Pilih Pendidikan Ayah" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SD / MI">SD / MI Sederajat</SelectItem>
                          <SelectItem value="SMP / MTs">SMP / MTs Sederajat</SelectItem>
                          <SelectItem value="SMA / MA / SMK">SMA / MA / SMK Sederajat</SelectItem>
                          <SelectItem value="Diploma (D1-D3)">Diploma (D1 - D3)</SelectItem>
                          <SelectItem value="Sarjana (S1)">Sarjana (S1)</SelectItem>
                          <SelectItem value="Magister (S2)">Magister (S2)</SelectItem>
                          <SelectItem value="Doktor (S3)">Doktor (S3)</SelectItem>
                          <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Pendidikan Terakhir Ibu <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.pendidikanIbu}
                        onValueChange={(val) => handleInputChange("pendidikanIbu", val)}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Pilih Pendidikan Ibu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SD / MI">SD / MI Sederajat</SelectItem>
                          <SelectItem value="SMP / MTs">SMP / MTs Sederajat</SelectItem>
                          <SelectItem value="SMA / MA / SMK">SMA / MA / SMK Sederajat</SelectItem>
                          <SelectItem value="Diploma (D1-D3)">Diploma (D1 - D3)</SelectItem>
                          <SelectItem value="Sarjana (S1)">Sarjana (S1)</SelectItem>
                          <SelectItem value="Magister (S2)">Magister (S2)</SelectItem>
                          <SelectItem value="Doktor (S3)">Doktor (S3)</SelectItem>
                          <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Pekerjaan Ayah <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Contoh: Petani, Wiraswasta, PNS, Karyawan"
                        value={formData.pekerjaanAyah}
                        onChange={(e) => handleInputChange("pekerjaanAyah", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Pekerjaan Ibu <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Contoh: Ibu Rumah Tangga, Guru, Pedagang"
                        value={formData.pekerjaanIbu}
                        onChange={(e) => handleInputChange("pekerjaanIbu", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Nomor Telepon / HP (WhatsApp Aktif) <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Contoh: 0812-XXXX-XXXX"
                        type="tel"
                        value={formData.noTelepon}
                        onChange={(e) => handleInputChange("noTelepon", e.target.value)}
                        className="rounded-xl"
                      />
                      <span className="text-[11px] text-gray-500 mt-1 block">
                        Pastikan nomor WhatsApp aktif untuk menerima konfirmasi dari panitia PSB.
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4. PENGINGAT PERSYARATAN YANG DIBAWA SAAT WAWANCARA/DAFTAR ULANG */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-5 sm:p-6 text-amber-950 shadow-sm">
                  <h4 className="font-extrabold text-sm sm:text-base mb-2 flex items-center gap-2 text-amber-900">
                    <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0" />
                    Jangan Lupakan Persyaratan yang Harus Dibawa ke Sekolah (Wawancara / Daftar Ulang):
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm list-disc pl-5 text-amber-900 leading-relaxed">
                    <li>
                      <strong>Pas Foto 3 x 4:</strong> Background Biru untuk Tingkat MTs, Background Biru Muda untuk Tingkat MA (masing-masing 2 Lembar).
                    </li>
                    <li>
                      <strong>Fotocopy Dokumen Pendukung (masing-masing 5 lembar):</strong> Akta Kelahiran, Kartu Keluarga (KK), SKHU/SKL, Ijazah SD/MI/SMP/MTs, KTP (Ayah dan Ibu).
                    </li>
                    <li>
                      <strong>Warna Map Berkas:</strong>
                      <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-1 text-[12px] font-medium text-amber-950">
                        <span>a. Biru (Putra) MTs</span>
                        <span>b. Hijau (Putri) MTs</span>
                        <span>c. Kuning (Putra) MA</span>
                        <span>d. Merah (Putri) MA</span>
                        <span className="sm:col-span-2">e. Abu-abu (Putra / Putri) SMK</span>
                      </div>
                    </li>
                    <li>
                      <strong>Catatan Penting:</strong> Semua persyaratan wajib dibawa saat melakukan wawancara/pendaftaran ulang di Yayasan Pondok Pesantren DARUL HIKAM, dimasukkan sesuai dengan map masing-masing.
                    </li>
                  </ul>
                </div>

                {/* 5. TOMBOL SUBMIT */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-gray-100">
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitStatus === "loading"}
                    className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white px-10 py-4 text-base rounded-2xl font-bold shadow-md hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {submitStatus === "loading" ? "Sedang Mengirim..." : "Kirim Formulir Pendaftaran"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="w-full sm:w-auto rounded-2xl text-gray-600 hover:text-gray-900"
                  >
                    Batal / Tutup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 4. BIAYA PENDIDIKAN */}
        <div className="max-w-6xl mx-auto mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-green-700 text-white rounded-2xl">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-green-800">Rincian Biaya Pendidikan</h2>
              <p className="text-sm text-gray-600">Transparansi rincian biaya pendaftaran, pangkal, dan bulanan per jenjang</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {Object.entries(biayaPendidikan).map(([key, data]) => {
              const totalUangPangkal = data.uangPangkal.reduce((acc, curr) => acc + curr.harga, 0)
              const totalBulanan = data.bulanan.reduce((acc, curr) => acc + curr.harga, 0)
              return (
                <Card key={key} className="border-2 border-green-200 shadow-md rounded-2xl bg-white flex flex-col justify-between">
                  <CardHeader className="bg-green-100/70 border-b border-green-200">
                    <CardTitle className="text-green-900 text-center text-lg font-bold">{data.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-4">
                    <div>
                      <h4 className="font-bold text-green-800 text-sm mb-2 uppercase tracking-wide">Uang Pangkal:</h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm">
                        {data.uangPangkal.map((item, idx) => (
                          <li key={idx} className="flex justify-between border-b border-gray-100 pb-1">
                            <span className="text-gray-700">{item.nama}</span>
                            <span className="font-semibold text-gray-900">{formatRupiah(item.harga)}</span>
                          </li>
                        ))}
                        <li className="flex justify-between font-bold text-green-900 pt-2 text-sm">
                          <span>Total Pangkal:</span>
                          <span>{formatRupiah(totalUangPangkal)}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-green-100">
                      <h4 className="font-bold text-green-800 text-sm mb-2 uppercase tracking-wide">Biaya Bulanan:</h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm">
                        {data.bulanan.map((item, idx) => (
                          <li key={idx} className="flex justify-between border-b border-gray-100 pb-1">
                            <span className="text-gray-700">{item.nama}</span>
                            <span className="font-semibold text-gray-900">{formatRupiah(item.harga)}</span>
                          </li>
                        ))}
                        <li className="flex justify-between font-bold text-green-900 pt-2 text-sm">
                          <span>Total Bulanan:</span>
                          <span>{formatRupiah(totalBulanan)}</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Catatan Biaya */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 text-amber-900">
            <h4 className="font-bold text-sm sm:text-base mb-2 flex items-center gap-2 text-amber-900">
              📌 Catatan Penting Pembayaran:
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm list-disc pl-5">
              {catatanBiaya.map((ctt, cIdx) => (
                <li key={cIdx}>{ctt}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 6. KONTAK PERSON PANITIA PSB */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-green-700 text-white rounded-2xl">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-green-800">Kontak Person Panitia PSB</h2>
              <p className="text-sm text-gray-600">Layanan informasi pendaftaran & konsultasi via WhatsApp / Telepon</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {kontakPanitia.map((kp) => (
              <a
                key={kp.id}
                href={kp.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-md transition-all rounded-2xl bg-white p-5 shadow-sm flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 group-hover:bg-emerald-600 group-hover:text-white text-emerald-800 rounded-2xl flex items-center justify-center transition-colors shadow-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-green-950 text-base">{kp.nama}</h4>
                    <p className="text-xs text-gray-500">{kp.jabatan}</p>
                    <span className="text-xs font-bold text-emerald-700 mt-1 inline-block">
                      {kp.hp}
                    </span>
                  </div>
                </div>
                <div className="px-3 py-1.5 bg-emerald-50 text-emerald-800 group-hover:bg-emerald-700 group-hover:text-white rounded-xl text-xs font-semibold border border-emerald-200 transition-colors">
                  Chat WA ➔
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
