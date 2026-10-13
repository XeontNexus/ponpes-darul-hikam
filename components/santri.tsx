"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  HeartHandshake,
  Sparkles,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  GraduationCap,
  BookMarked,
  Trophy,
  Users,
  Building2,
} from "lucide-react"
import Image from "next/image"

interface BannerSlide {
  id: number
  title: string
  subtitle: string
  image: string
}

interface KegiatanItem {
  id: number
  judul: string
  penjelasan: string
  foto: string
  kategori?: string
}

interface FasilitasItem {
  id: number
  nama: string
  deskripsi: string
  foto: string
}

interface PelajaranJenjang {
  jenjang: string
  deskripsi: string
  mapel: string[]
}

interface KitabItem {
  namaKitab: string
  pengarang: string
  bidang: string
  deskripsi: string
}

interface EkskulItem {
  nama: string
  kategori: string
  deskripsi: string
}

interface SantriProps {
  isAdmin?: boolean
}

export function Santri({ isAdmin = false }: SantriProps) {
  // ── ALL STATE DECLARATIONS FIRST ──────────────────────────────────────────

  // Slider current indices
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
  const [currentPelajaranSlide, setCurrentPelajaranSlide] = useState(0)
  const [currentKitabSlide, setCurrentKitabSlide] = useState(0)
  const [currentEkskulSlide, setCurrentEkskulSlide] = useState(0)

  // Data Fasilitas Pondok Pesantren (Dipindahkan dari Pendaftaran)
  const fasilitas: FasilitasItem[] = [
    {
      id: 1,
      nama: "Masjid Utama Darul Hikam",
      deskripsi: "Masjid yang luas dan nyaman penampung 1000+ jamaah untuk ibadah dan kajian keislaman.",
      foto: "/images/banner4.png",
    },
    {
      id: 2,
      nama: "Asrama Santri Putra & Putri",
      deskripsi: "Asrama bersih dan terpelihara lengkap dengan pengawasan ustadz/ustadzah 24 jam.",
      foto: "/images/banner1.png",
    },
    {
      id: 3,
      nama: "Perpustakaan & Ruang Baca",
      deskripsi: "Koleksi buku agama klasik, kitab turats, serta buku pengetahuan umum.",
      foto: "/images/sejarah5.png",
    },
    {
      id: 4,
      nama: "Laboratorium Komputer & IT",
      deskripsi: "Lab komputer modern terhubung koneksi internet untuk pembelajaran siswa SMK dan MTs.",
      foto: "/images/banner5.png",
    },
  ]

  // Default data (fallback when DB is empty)
  const defaultHeroSlides: BannerSlide[] = [
    {
      id: 1,
      title: "Kehidupan & Karakter Santri",
      subtitle: "Membentuk pribadi santri yang mandiri, disiplin, berakhlak mulia, dan berlandaskan Al-Qur'an.",
      image: "/images/banner1.png",
    },
    {
      id: 2,
      title: "Kajian Kitab Kuning & Syariat",
      subtitle: "Mendalami ilmu-ilmu agama klasik Islam bersama para Ustadz dan Ustadzah pengampu.",
      image: "/images/banner2.png",
    },
    {
      id: 3,
      title: "Pembiasaan Ibadah & Shalat Berjamaah",
      subtitle: "Menanamkan nilai spiritualitas tinggi melalui shalat berjamaah 5 waktu di Masjid Utama.",
      image: "/images/banner4.png",
    },
    {
      id: 4,
      title: "Pendidikan Formal & Keterampilan Modern",
      subtitle: "Menyeimbangkan ilmu syariat dengan sains, matematika, serta teknologi informasi modern.",
      image: "/images/banner5.png",
    },
    {
      id: 5,
      title: "Lingkungan Asrama yang Asri & Nyaman",
      subtitle: "Suasana belajar dan beristirahat yang kondusif bagi tumbuh kembang santri putra dan putri.",
      image: "/images/banner3.png",
    },
    {
      id: 6,
      title: "Kemandirian & Kebersamaan Ukhuwah",
      subtitle: "Menumbuhkan jiwa kepemimpinan, kepedulian sosial, dan gotong royong antar sesama santri.",
      image: "/images/sejarah1.png",
    },
  ]
  // 2. Banner Slider Pelajaran Formal (Max 10 Slide)
  const defaultPelajaranSlides: BannerSlide[] = [
    { id: 1, title: "Pendidikan PAUD & RA Islami", subtitle: "Pembentukan dasar akhlak mulia dan pengenalan huruf hijaiyah usia dini.", image: "/images/banner1.png" },
    { id: 2, title: "Pelajaran SD / MI Terpadu", subtitle: "Pendidikan dasar membaca Al-Qur'an, matematika, dan ilmu pengetahuan alam.", image: "/images/banner2.png" },
    { id: 3, title: "Pembelajaran MTs (Menengah Pertama)", subtitle: "Pendalaman Bahasa Arab, Bahasa Inggris, Matematika, IPA, dan Fiqih Islam.", image: "/images/banner5.png" },
    { id: 4, title: "Pembelajaran MA (Menengah Atas)", subtitle: "Penjurian IPA, IPS, dan Keagamaan untuk persiapan perguruan tinggi nasional/timur tengah.", image: "/images/banner3.png" },
    { id: 5, title: "Pembelajaran SMK Kejuruan", subtitle: "Penguasaan keahlian vokasi, teknik komputer jaringan, dan rekayasa perangkat lunak.", image: "/images/sejarah4.png" },
    { id: 6, title: "Praktik Laboratorium Sains & Komputer", subtitle: "Fasilitas eksperimen fisika, biologi, dan komputer berteknologi modern.", image: "/images/banner5.png" },
    { id: 7, title: "Bimbingan Olimpiade Sains & Keagamaan", subtitle: "Pembinaan khusus bagi santri bertalenta tinggi untuk ajang kompetisi.", image: "/images/sejarah3.png" },
    { id: 8, title: "Pembelajaran Bahasa Foreign Language", subtitle: "Penguasaan percakapan Bahasa Arab dan Inggris harian (*Muhadatsah*).", image: "/images/banner2.png" },
    { id: 9, title: "Studi Literasi & Perpustakaan Digital", subtitle: "Penyediaan ribuan koleksi buku referensi agama dan pengetahuan umum.", image: "/images/sejarah5.png" },
    { id: 10, title: "Integrasi Kurikulum Kemendikbud & Kemenag", subtitle: "Ijazah resmi terakreditasi nasional yang diakui secara luas.", image: "/images/banner4.png" },
  ]
  // 3. Banner Slider Ngaji Kitab Kuning (Max 10 Slide)
  const defaultKitabSlides: BannerSlide[] = [
    { id: 1, title: "Kajian Kitab Fiqih Safinatun Najah", subtitle: "Dasar-dasar tata cara bersuci, shalat, dan ibadah fardhu harian santri pemula.", image: "/images/banner2.png" },
    { id: 2, title: "Kajian Kitab Fathul Qorib", subtitle: "Pendalaman hukum fiqih muamalah, munakahat, dan ibadah tingkat menengah.", image: "/images/sejarah2.png" },
    { id: 3, title: "Kajian Nahwu Kitab Matan Al-Jurumiyah", subtitle: "Kaidah tata bahasa Arab tata kata dan tata kalimat dasar.", image: "/images/banner4.png" },
    { id: 4, title: "Kajian Kitab Nadhom Al-Imrithi & Alfiyah", subtitle: "Hafalan bait-bait tata bahasa Arab tingkat lanjut bagi santri senior.", image: "/images/sejarah1.png" },
    { id: 5, title: "Kajian Hadits Bulughul Maram", subtitle: "Himpunan hadits-hadits hukum fiqih perbandingan dalil shahih.", image: "/images/banner3.png" },
    { id: 6, title: "Kajian Akhlak Ta'lim Muta'allim", subtitle: "Pedoman adab ilmu, menghormati guru, dan etika penuntut ilmu syariat.", image: "/images/banner1.png" },
    { id: 7, title: "Kajian Tafsir Al-Qur'an Jalalain", subtitle: "Pemahaman makna makna ayat Al-Qur'an secara ilmiah dan mendalam.", image: "/images/sejarah3.png" },
    { id: 8, title: "Kajian Hadits Arbain Nawawiyah", subtitle: "Pelajaran 42 hadits pokok ajaran agama Islam karya Imam An-Nawawi.", image: "/images/banner5.png" },
    { id: 9, title: "Kajian Aqidah Aqidatul Awam", subtitle: "Penanaman rukun iman dan aqidah Ahli Sunnah Wal Jama'ah (Aswaja).", image: "/images/sejarah5.png" },
    { id: 10, title: "Kajian Tasawuf Riyadhus Shalihin", subtitle: "Pembersihan jiwa, penataan hati, dan tazkiyatun nufus dalam ibadah.", image: "/images/banner4.png" },
  ]
  // 4. Banner Slider Ekstrakurikuler (Max 10 Slide)
  const defaultEkskulSlides: BannerSlide[] = [
    { id: 1, title: "Seni Hadroh & Qasidah Rebana", subtitle: "Grup sholawat santri penampil acara resmi dan festival keagamaan.", image: "/images/sejarah1.png" },
    { id: 2, title: "Pencak Silat Pagar Nusa / Tapak Suci", subtitle: "Seni bela diri tradisional pembentuk fisik tangguh dan kedisiplinan.", image: "/images/sejarah4.png" },
    { id: 3, title: "Olahraga Sunnah Panahan (Archery)", subtitle: "Latihan konsentrasi, ketepatan, dan pembentukan fokus mental santri.", image: "/images/banner1.png" },
    { id: 4, title: "Jam'iyyah Qira'ah & Tilawatil Qur'an", subtitle: "Bimbingan seni membaca Al-Qur'an berlagu (*Lagam Mujawwad*).", image: "/images/banner2.png" },
    { id: 5, title: "Public Speaking & Muhadhoroh 3 Bahasa", subtitle: "Latihan pidato dan dakwah dalam Bahasa Indonesia, Arab, dan Inggris.", image: "/images/banner3.png" },
    { id: 6, title: "Gerakan Pramuka Pesantren", subtitle: "Pramuka bernuansa islami melatih keorganisasian dan kemandirian lapangan.", image: "/images/banner5.png" },
    { id: 7, title: "Seni Kaligrafi Islam (Khat Al-Qur'an)", subtitle: "Keterampilan seni menulis indah ayat Al-Qur'an naskhi, tsuluts, dan diwani.", image: "/images/sejarah3.png" },
    { id: 8, title: "Klub Olahraga Futsal & Bola Voli", subtitle: "Kegiatan kebugaran fisik dan kejuaraan antar pesantren kabupaten.", image: "/images/banner4.png" },
    { id: 9, title: "Jurnalistik & Media Santri", subtitle: "Pelatihan fotografi, videografi, dan penulisan buletin pesantren.", image: "/images/sejarah5.png" },
    { id: 10, title: "Klub Komputer & Coding Robotik", subtitle: "Pengembangan bakat pemograman web dan teknologi informasi masa kini.", image: "/images/banner5.png" },
  ]

  // Data Kurikulum Pelajaran Formal
  const defaultPelajaran: PelajaranJenjang[] = [
    {
      jenjang: "PAUD & RA",
      deskripsi: "Pendidikan anak usia dini berbasis pembentukan karakter akhlakul karimah.",
      mapel: ["Membaca Hijaiyah & Iqra'", "Hafalan Surat Pendek & Doa Harian", "Mewarnai & Keterampilan Motorik", "Bahasa Indonesia Dasar"],
    },
    {
      jenjang: "SD / MI",
      deskripsi: "Pendidikan dasar terpadu penguatan Al-Qur'an dan literasi sains dasar.",
      mapel: ["Al-Qur'an Hadits", "Akidah Akhlak", "Fiqih Ibadah", "Matematika & IPA", "Bahasa Indonesia & Inggris"],
    },
    {
      jenjang: "MTs (Menengah Pertama)",
      deskripsi: "Formalisasi jenjang sekolah menengah pertama dengan penguatan Bahasa Arab dan Sains.",
      mapel: ["Bahasa Arab & Nahwu", "Tahfidz Al-Qur'an", "Matematika & IPA Terpadu", "IPS & Bahasa Inggris", "Informatika / Komputer"],
    },
    {
      jenjang: "MA (Menengah Atas)",
      deskripsi: "Jenjang pendidikan menengah atas dengan peminatan Keagamaan, IPA, dan IPS.",
      mapel: ["Tafsir & Ulumul Qur'an", "Hadits & Mustholah Hadits", "Fiqih & Ushul Fiqih", "Fisika, Kimia, Biologi", "Ekonomi & Sosiologi"],
    },
    {
      jenjang: "SMK Darul Hikam",
      deskripsi: "Sekolah Menengah Kejuruan vokasi berbekal keterampilan praktis dunia kerja.",
      mapel: ["Teknik Komputer & Jaringan (TKJ)", "Rekayasa Perangkat Lunak (RPL)", "Desain Grafis & Pemograman Web", "Kewirausahaan Digital"],
    },
  ]

  // Data Kitab Kuning Madrasah Diniyah
  const defaultKitab: KitabItem[] = [
    { namaKitab: "Safinatun Najah", pengarang: "Syekh Salim bin Sumair Al-Hadhrami", bidang: "Fiqih Ibadah", deskripsi: "Dasar hukum ibadah thaharah, shalat, zakat, dan puasa." },
    { namaKitab: "Fathul Qorib", pengarang: "Syekh Ibn Qasim Al-Ghazi", bidang: "Fiqih Syariat", deskripsi: "Pedoman hukum fiqih terpadu muamalah dan ibadah santri menengah." },
    { namaKitab: "Matan Al-Jurumiyah", pengarang: "Syekh Abu Abdillah Ash-Shanhaji", bidang: "Gramatika Nahwu", deskripsi: "Kaidah susunan kata dan kalimat dalam Bahasa Arab." },
    { namaKitab: "Nadhom Al-Imrithi", pengarang: "Syekh Syarafuddin Al-Imrithi", bidang: "Nahwu Sastra", deskripsi: "Bait syair hafalan tata bahasa Arab tingkat lanjut." },
    { namaKitab: "Bulughul Maram", pengarang: "Al-Hafizh Ibn Hajar Al-Asqalani", bidang: "Hadits Hukum", deskripsi: "Kumpulan hadits shahih dasar dalil-dalil hukum syariat." },
    { namaKitab: "Ta'lim Muta'allim", pengarang: "Syekh Burhanuddin Al-Zarnuji", bidang: "Akhlak & Adab", deskripsi: "Panduan etika penuntut ilmu, adab pada guru dan Al-Qur'an." },
    { namaKitab: "Tafsir Jalalain", pengarang: "Imam Jalaluddin Al-Mahalli & As-Suyuthi", bidang: "Tafsir Al-Qur'an", deskripsi: "Penjelasan makna ringkas dan ilmiah ayat-ayat Al-Qur'an." },
    { namaKitab: "Aqidatul Awam", pengarang: "Syekh Ahmad Al-Marzuki", bidang: "Aqidah Tauhid", deskripsi: "Nadzom tauhid pemahaman dasar iman dan rukun islam." },
  ]

  // Data Ekstrakurikuler
  const defaultEkskul: EkskulItem[] = [
    { nama: "Seni Hadroh & Qasidah", kategori: "Kesenian Islami", deskripsi: "Grup lantunan sholawat dengan alat musik rebana tradisional." },
    { nama: "Pencak Silat Pagar Nusa / Tapak Suci", kategori: "Bela Diri", deskripsi: "Latihan bela diri fisik, ketangkasan, dan pembentukan jiwa ksatria." },
    { nama: "Panahan (Archery)", kategori: "Olahraga Sunnah", deskripsi: "Latihan melatih fokus pikiran, stabilitas tangan, dan konsentrasi." },
    { nama: "Jam'iyyah Qira'ah", kategori: "Seni Al-Qur'an", deskripsi: "Bimbingan teknik pembacaan Al-Qur'an bernada tinggi dan indah." },
    { nama: "Muhadhoroh 3 Bahasa", kategori: "Public Speaking", deskripsi: "Latihan pidato dan khutbah dalam Bahasa Indonesia, Arab, & Inggris." },
    { nama: "Pramuka Pesantren", kategori: "Organisasi", deskripsi: "Kegiatan kepanduan islami, kedisiplinan, dan survival outdoor." },
    { nama: "Khat & Kaligrafi", kategori: "Seni Rupa", deskripsi: "Seni melukis dan mengukir tulisan naskah ayat Al-Qur'an." },
    { nama: "Klub Futsal & Voli", kategori: "Olahraga Tim", deskripsi: "Pertandingan persahabatan dan kejuaraan antar pesantren daerah." },
  ]

  // Chart Foto Kegiatan State
  const [daftarKegiatan, setDaftarKegiatan] = useState<KegiatanItem[]>([
    {
      id: 1,
      judul: "Kajian Kitab Kuning & Syariat",
      penjelasan: "Pembelajaran rutin kitab-kitab klasik keislaman meliputi Fiqih, Nahwu Shorof, Aqidah, dan Hadits bersama para Ustadz.",
      foto: "/images/banner2.png",
      kategori: "Akademik Keagamaan",
    },
    {
      id: 2,
      judul: "Setoran Tahfidz & Muraja'ah Al-Qur'an",
      penjelasan: "Program bimbingan hafalan Al-Qur'an yang dilaksanakan secara intensif setiap ba'da Subuh dan Maghrib.",
      foto: "/images/sejarah3.png",
      kategori: "Tahfizh Al-Qur'an",
    },
    {
      id: 3,
      judul: "Shalat Berjamaah & Dzikir Bersama",
      penjelasan: "Pembiasaan ibadah shalat fardhu 5 waktu secara berjamaah di Masjid Utama Darul Hikam dilanjutkan pembacaan ratib.",
      foto: "/images/banner4.png",
      kategori: "Spiritual & Peribadatan",
    },
    {
      id: 4,
      judul: "Praktik Laboratorium & Pembelajaran IT",
      penjelasan: "Santri dibekali keterampilan teknologi informasi modern melalui praktik laboratorium komputer dan desain.",
      foto: "/images/banner5.png",
      kategori: "Sains & Teknologi",
    },
    {
      id: 5,
      judul: "Ekstrakurikuler & Olahraga Sunnah",
      penjelasan: "Wadah pengembangan bakat dan kesehatan fisik santri meliputi olahraga panahan, pencak silat, pramuka, dan hadroh.",
      foto: "/images/sejarah4.png",
      kategori: "Ekstrakurikuler",
    },
    {
      id: 6,
      judul: "Kemandirian & Ro'an Gotong Royong",
      penjelasan: "Budaya kebersihan lingkungan pesantren dan kerja bakti harian untuk menumbuhkan jiwa kepemimpinan & kemandirian.",
      foto: "/images/banner1.png",
      kategori: "Karakter & Kemandirian",
    },
  ])

  const [editingKegiatan, setEditingKegiatan] = useState<KegiatanItem | null>(null)
  const [showAddKegiatanForm, setShowAddKegiatanForm] = useState(false)
  const [newKegiatan, setNewKegiatan] = useState<Omit<KegiatanItem, "id">>({
    judul: "",
    penjelasan: "",
    foto: "/images/banner1.png",
    kategori: "Aktivitas Harian",
  })
  const [uploadingImage, setUploadingImage] = useState<number | null>(null)

  // ── DB-connected state with fallback ──────────────────────────────────────
  const [heroSlides, setHeroSlides] = useState<BannerSlide[]>(defaultHeroSlides)
  const [pelajaranSlides, setPelajaranSlides] = useState<BannerSlide[]>(defaultPelajaranSlides)
  const [kitabSlides, setKitabSlides] = useState<BannerSlide[]>(defaultKitabSlides)
  const [ekskulSlides, setEkskulSlides] = useState<BannerSlide[]>(defaultEkskulSlides)
  const [dataPelajaran, setDataPelajaran] = useState<PelajaranJenjang[]>(defaultPelajaran)
  const [dataKitab, setDataKitab] = useState<KitabItem[]>(defaultKitab)
  const [dataEkskul, setDataEkskul] = useState<EkskulItem[]>(defaultEkskul)
  const [budaya1, setBudaya1] = useState("Di Pondok Pesantren DARUL HIKAM, kehidupan santri didesain secara seimbang antara pembiasaan kedisiplinan ibadah, pendalaman ilmu syariat Islam melalui kitab-kitab klasik, hafalan Al-Qur'an, serta pendidikan formal nasional.")
  const [budaya2, setBudaya2] = useState("Selama 24 jam dalam lingkungan asrama yang asri dan terpelihara, santri diajarkan kemandirian, tata krama berakhlak mulia, rasa kepedulian sosial, serta kesiapan dalam menghadapi tantangan era digital.")
  const statistikSantriDBInit = [
    { jenjang: "PAUD", jumlah: 85 },
    { jenjang: "MI", jumlah: 340 },
    { jenjang: "MTs", jumlah: 415 },
    { jenjang: "MA", jumlah: 280 },
    { jenjang: "SMK", jumlah: 230 },
  ]
  const [statistikSantriDB, setStatistikSantriDB] = useState<any[]>(statistikSantriDBInit)

  // Derived: total santri
  const totalSantri = statistikSantriDB.reduce((acc: number, curr: any) => acc + (Number(curr.jumlah) || 0), 0)

  // Auto slide timers (6 detik)
  useEffect(() => {
    if (heroSlides.length === 0) return
    const t1 = setInterval(() => setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length), 6000)
    const t2 = setInterval(() => setCurrentPelajaranSlide((prev) => (prev + 1) % pelajaranSlides.length), 6000)
    const t3 = setInterval(() => setCurrentKitabSlide((prev) => (prev + 1) % kitabSlides.length), 6000)
    const t4 = setInterval(() => setCurrentEkskulSlide((prev) => (prev + 1) % ekskulSlides.length), 6000)
    return () => {
      clearInterval(t1)
      clearInterval(t2)
      clearInterval(t3)
      clearInterval(t4)
    }
  }, [heroSlides.length, pelajaranSlides.length, kitabSlides.length, ekskulSlides.length])

  // Fetch data from DB on mount
  useEffect(() => {
    // Fetch slides
    const fetchSlides = (kategori: string, setter: (v: BannerSlide[]) => void) => {
      fetch(`/api/santri-slides?kategori=${kategori}`).then((r) => r.json()).then((data) => {
        if (Array.isArray(data) && data.length > 0) setter(data)
      }).catch(() => {})
    }
    fetchSlides("hero", setHeroSlides)
    fetchSlides("pelajaran", setPelajaranSlides)
    fetchSlides("kitab", setKitabSlides)
    fetchSlides("ekskul", setEkskulSlides)

    // Fetch pelajaran jenjang
    fetch("/api/pelajaran-jenjang").then((r) => r.json()).then((data) => {
      if (Array.isArray(data) && data.length > 0) setDataPelajaran(data.map((d: any) => ({ jenjang: d.jenjang, deskripsi: d.deskripsi || "", mapel: typeof d.mapel === "string" ? d.mapel.split("\n").filter(Boolean) : d.mapel })))
    }).catch(() => {})

    // Fetch kitab
    fetch("/api/kitab-kuning").then((r) => r.json()).then((data) => {
      if (Array.isArray(data) && data.length > 0) setDataKitab(data)
    }).catch(() => {})

    // Fetch ekskul
    fetch("/api/ekskul").then((r) => r.json()).then((data) => {
      if (Array.isArray(data) && data.length > 0) setDataEkskul(data)
    }).catch(() => {})

    // Fetch kegiatan
    fetch("/api/kegiatan-santri").then((r) => r.json()).then((data) => {
      if (Array.isArray(data) && data.length > 0) setDaftarKegiatan(data)
    }).catch(() => {})

    // Fetch budaya paragraphs
    fetch("/api/settings").then((r) => r.json()).then((data) => {
      if (data && !data.error) {
        if (data.santriBudaya1) setBudaya1(data.santriBudaya1)
        if (data.santriBudaya2) setBudaya2(data.santriBudaya2)
      }
    }).catch(() => {})

    // Fetch statistik
    fetch("/api/statistik-santri").then((r) => r.json()).then((data) => {
      if (Array.isArray(data) && data.length > 0) setStatistikSantriDB(data)
    }).catch(() => {})
  }, [])

  const handleEditKegiatan = (item: KegiatanItem) => setEditingKegiatan({ ...item })
  const handleSaveKegiatan = () => {
    if (editingKegiatan) {
      setDaftarKegiatan((prev) => prev.map((item) => (item.id === editingKegiatan.id ? editingKegiatan : item)))
      setEditingKegiatan(null)
    }
  }
  const handleDeleteKegiatan = (id: number) => setDaftarKegiatan((prev) => prev.filter((item) => item.id !== id))
  const handleAddKegiatan = () => {
    if (newKegiatan.judul && newKegiatan.penjelasan) {
      setDaftarKegiatan((prev) => [...prev, { ...newKegiatan, id: Date.now() }])
      setNewKegiatan({ judul: "", penjelasan: "", foto: "/images/banner1.png", kategori: "Aktivitas Harian" })
      setShowAddKegiatanForm(false)
    }
  }

  const handleFotoUpload = (file: File, itemId: number) => {
    if (file && file.type.startsWith("image/")) {
      setUploadingImage(itemId)
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setDaftarKegiatan((prev) => prev.map((item) => (item.id === itemId ? { ...item, foto: imageUrl } : item)))
        setUploadingImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-green-50 to-white animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-700 ease-out">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-3">
            Dunia & Kehidupan Santri
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Informasi lengkap mengenai kurikulum formal, kajian kitab kuning, ekstrakurikuler, serta aktivitas harian santri Pondok Pesantren DARUL HIKAM.
          </p>
        </div>

        {/* 1. HERO BANNER SLIDER (MAX 6 SLIDE) */}
        <div className="mb-14 sm:mb-18 max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl shadow-xl border-4 border-green-600/20 group h-[280px] sm:h-[400px] md:h-[480px]">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentHeroSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image src={slide.image} alt={slide.title} fill priority={index === 0} className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
                  <h3 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 text-green-300 drop-shadow-md">{slide.title}</h3>
                  <p className="text-sm sm:text-base text-gray-200 max-w-2xl leading-relaxed drop-shadow">{slide.subtitle}</p>
                </div>
              </div>
            ))}
            <button
              onClick={() => setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-md" />
            </button>
            <button
              onClick={() => setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-md" />
            </button>
            <div className="hidden md:flex absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 gap-1 sm:gap-1.5">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHeroSlide(idx)}
                  className={`h-[3px] rounded-sm transition-all duration-300 ${
                    idx === currentHeroSlide ? "w-5 sm:w-7 bg-emerald-400" : "w-2.5 sm:w-4 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 2. PENJELASAN BUDAYA SANTRI */}
        <div className="max-w-5xl mx-auto mb-16 sm:mb-20">
          <div className="bg-white rounded-3xl border-2 border-green-200 p-6 sm:p-10 shadow-lg">
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-12 h-12 bg-green-100 text-green-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4">Budaya & Kehidupan Santri Darul Hikam</h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                {budaya1}
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {budaya2}
              </p>
            </div>
          </div>
        </div>

        {/* 2.5 STATISTIK SANTRI */}
        <div className="max-w-6xl mx-auto mb-16 sm:mb-24">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-3">Statistik Jumlah Santri</h2>
            <p className="text-gray-600">Total keseluruhan santri per jenjang pendidikan (bukan per kelas)</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {statistikSantriDB.map((stat: any) => (
              <div key={stat.jenjang} className="bg-white rounded-2xl p-5 border border-green-100 shadow-sm text-center flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                <span className="text-gray-500 text-sm font-medium mb-2">Tingkat {stat.jenjang}</span>
                <span className="text-3xl font-bold text-green-700">{stat.jumlah}</span>
                <span className="text-xs text-gray-400 mt-1">Santri</span>
              </div>
            ))}
            
            {/* Total Keseluruhan */}
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-5 shadow-md text-center flex flex-col items-center justify-center col-span-2 md:col-span-3 lg:col-span-1 transform hover:-translate-y-1 transition-transform duration-300 text-white">
              <Users className="w-8 h-8 mb-2 opacity-80" />
              <span className="text-green-100 text-sm font-medium mb-1">Total Keseluruhan</span>
              <span className="text-3xl sm:text-4xl font-bold">{totalSantri}</span>
              <span className="text-xs text-green-200 mt-1">Santri</span>
            </div>
          </div>
        </div>

        {/* 3. PELAJARAN FORMAL (PAUD HINGGA MA & SMK) + BANNER MAX 10 FOTO */}
        <div className="max-w-6xl mx-auto mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-green-700 text-white rounded-2xl">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-green-800">Kurikulum & Pelajaran Formal (PAUD hingga MA & SMK)</h2>
              <p className="text-sm text-gray-600">Program pendidikan formal terakreditasi nasional dari jenjang terendah hingga atas</p>
            </div>
          </div>

          {/* Banner Slider Pelajaran Formal (Max 10 Foto) */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl border-4 border-green-600/20 mb-8 h-[240px] sm:h-[360px] md:h-[420px]">
            {pelajaranSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentPelajaranSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image src={slide.image} alt={slide.title} fill className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-8 text-white">
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-green-300">{slide.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-200 mt-1">{slide.subtitle}</p>
                </div>
              </div>
            ))}
            <button
              onClick={() => setCurrentPelajaranSlide((prev) => (prev - 1 + pelajaranSlides.length) % pelajaranSlides.length)}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-md" />
            </button>
            <button
              onClick={() => setCurrentPelajaranSlide((prev) => (prev + 1) % pelajaranSlides.length)}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-md" />
            </button>
            <div className="hidden md:flex absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 gap-1">
              {pelajaranSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPelajaranSlide(idx)}
                  className={`h-[3px] rounded-sm transition-all duration-300 ${
                    idx === currentPelajaranSlide ? "w-4 sm:w-6 bg-emerald-400" : "w-2 sm:w-3 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Grid Cards Jenjang Pelajaran Formal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataPelajaran.map((item, idx) => (
              <Card key={idx} className="border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all rounded-2xl bg-white">
                <CardHeader className="pb-3">
                  <Badge className="w-fit bg-green-100 text-green-800 font-bold mb-1">{item.jenjang}</Badge>
                  <CardTitle className="text-lg font-bold text-green-900">{item.jenjang}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">{item.deskripsi}</p>
                  <h4 className="text-xs font-bold text-green-800 uppercase tracking-wider mb-2">Mata Pelajaran Utama:</h4>
                  <ul className="space-y-1.5">
                    {item.mapel.map((mp, mIdx) => (
                      <li key={mIdx} className="text-xs sm:text-sm text-gray-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0" />
                        {mp}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 4. KAJIAN KITAB KUNING & MADRASAH DINIYAH + BANNER MAX 10 FOTO */}
        <div className="max-w-6xl mx-auto mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-green-700 text-white rounded-2xl">
              <BookMarked className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-green-800">Kajian Kitab Kuning (Madrasah Diniyah)</h2>
              <p className="text-sm text-gray-600">Daftar kitab-kitab turats klasik yang dipelajari dan dihafalkan santri</p>
            </div>
          </div>

          {/* Banner Slider Ngaji Kitab (Max 10 Foto) */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl border-4 border-green-600/20 mb-8 h-[240px] sm:h-[360px] md:h-[420px]">
            {kitabSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentKitabSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image src={slide.image} alt={slide.title} fill className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-8 text-white">
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-green-300">{slide.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-200 mt-1">{slide.subtitle}</p>
                </div>
              </div>
            ))}
            <button
              onClick={() => setCurrentKitabSlide((prev) => (prev - 1 + kitabSlides.length) % kitabSlides.length)}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-md" />
            </button>
            <button
              onClick={() => setCurrentKitabSlide((prev) => (prev + 1) % kitabSlides.length)}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-md" />
            </button>
            <div className="hidden md:flex absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 gap-1">
              {kitabSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentKitabSlide(idx)}
                  className={`h-[3px] rounded-sm transition-all duration-300 ${
                    idx === currentKitabSlide ? "w-4 sm:w-6 bg-emerald-400" : "w-2 sm:w-3 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Grid Cards Kitab Kuning */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dataKitab.map((kitab, idx) => (
              <Card key={idx} className="border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all rounded-2xl bg-white flex flex-col justify-between">
                <CardContent className="p-4 sm:p-5">
                  <Badge variant="outline" className="text-green-800 border-green-300 text-xs mb-2 font-semibold">
                    {kitab.bidang}
                  </Badge>
                  <h3 className="font-bold text-green-900 text-base mb-1">Kitab {kitab.namaKitab}</h3>
                  <p className="text-xs text-gray-500 italic mb-2">Karya: {kitab.pengarang}</p>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{kitab.deskripsi}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 5. EKSTRAKURIKULER PONPES + BANNER MAX 10 FOTO */}
        <div className="max-w-6xl mx-auto mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-green-700 text-white rounded-2xl">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-green-800">Ekstrakurikuler & Pengembangan Bakat</h2>
              <p className="text-sm text-gray-600">Wadah penyaluran bakat, minat, seni, serta kesehatan fisik santri</p>
            </div>
          </div>

          {/* Banner Slider Ekstrakurikuler (Max 10 Foto) */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl border-4 border-green-600/20 mb-8 h-[240px] sm:h-[360px] md:h-[420px]">
            {ekskulSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentEkskulSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image src={slide.image} alt={slide.title} fill className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-8 text-white">
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-green-300">{slide.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-200 mt-1">{slide.subtitle}</p>
                </div>
              </div>
            ))}
            <button
              onClick={() => setCurrentEkskulSlide((prev) => (prev - 1 + ekskulSlides.length) % ekskulSlides.length)}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-md" />
            </button>
            <button
              onClick={() => setCurrentEkskulSlide((prev) => (prev + 1) % ekskulSlides.length)}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-md" />
            </button>
            <div className="hidden md:flex absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 gap-1">
              {ekskulSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentEkskulSlide(idx)}
                  className={`h-[3px] rounded-sm transition-all duration-300 ${
                    idx === currentEkskulSlide ? "w-4 sm:w-6 bg-emerald-400" : "w-2 sm:w-3 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Grid Cards Ekstrakurikuler */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dataEkskul.map((ekskul, idx) => (
              <Card key={idx} className="border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all rounded-2xl bg-white flex flex-col justify-between">
                <CardContent className="p-4 sm:p-5">
                  <Badge className="bg-green-100 text-green-800 border-none text-xs mb-2 font-semibold">
                    {ekskul.kategori}
                  </Badge>
                  <h3 className="font-bold text-green-900 text-base mb-1.5">{ekskul.nama}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{ekskul.deskripsi}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 6. CHART FOTO KEGIATAN & PENJELASAN */}
        <div className="max-w-6xl mx-auto mb-16 sm:mb-24">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-800">
                Chart Foto Kegiatan & Penjelasan
              </h2>
              <p className="text-sm text-gray-600">Rangkaian dokumentasi kegiatan rutin dan aktivitas harian santri</p>
            </div>
            {isAdmin && (
              <Button
                onClick={() => setShowAddKegiatanForm(!showAddKegiatanForm)}
                className="bg-green-700 hover:bg-green-800 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Kegiatan
              </Button>
            )}
          </div>

          {/* Form Tambah Kegiatan (Admin) */}
          {showAddKegiatanForm && isAdmin && (
            <Card className="mb-8 border-2 border-green-200 shadow-md">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg font-bold text-green-800 mb-4">Tambah Chart Kegiatan Baru</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Judul Kegiatan (cth: Kajian Kitab Kuning)"
                    value={newKegiatan.judul}
                    onChange={(e) => setNewKegiatan({ ...newKegiatan, judul: e.target.value })}
                  />
                  <Input
                    placeholder="Kategori (cth: Keagamaan / Olahraga)"
                    value={newKegiatan.kategori}
                    onChange={(e) => setNewKegiatan({ ...newKegiatan, kategori: e.target.value })}
                  />
                  <div className="sm:col-span-2">
                    <Textarea
                      placeholder="Penjelasan Detail Kegiatan..."
                      value={newKegiatan.penjelasan}
                      onChange={(e) => setNewKegiatan({ ...newKegiatan, penjelasan: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Input
                      placeholder="URL Foto Kegiatan"
                      value={newKegiatan.foto}
                      onChange={(e) => setNewKegiatan({ ...newKegiatan, foto: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2 flex gap-2 pt-2">
                    <Button onClick={handleAddKegiatan} className="bg-green-700 hover:bg-green-800">
                      <Save className="w-4 h-4 mr-2" /> Simpan
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddKegiatanForm(false)}>
                      <X className="w-4 h-4 mr-2" /> Batal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Grid Cards Foto Kegiatan dan Penjelasan */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {daftarKegiatan.map((item) => (
              <Card
                key={item.id}
                className="border-2 border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                    <Image
                      src={item.foto || "/placeholder.svg"}
                      alt={item.judul}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {item.kategori && (
                      <span className="absolute top-3 left-3 bg-green-800/80 text-white text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm">
                        {item.kategori}
                      </span>
                    )}
                    {isAdmin && (
                      <div className="absolute bottom-2 right-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFotoUpload(file, item.id)
                          }}
                          className="hidden"
                          id={`upload-kegiatan-${item.id}`}
                        />
                        <label
                          htmlFor={`upload-kegiatan-${item.id}`}
                          className="bg-white/90 hover:bg-white text-green-800 px-2 py-1 rounded text-xs cursor-pointer flex items-center gap-1 shadow font-medium"
                        >
                          📷 Ganti Foto
                        </label>
                      </div>
                    )}
                    {uploadingImage === item.id && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-sm">Uploading...</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5">
                    {editingKegiatan?.id === item.id ? (
                      <div className="space-y-3">
                        <Input
                          value={editingKegiatan.judul}
                          onChange={(e) => setEditingKegiatan({ ...editingKegiatan, judul: e.target.value })}
                          placeholder="Judul Kegiatan"
                          className="font-bold text-sm"
                        />
                        <Input
                          value={editingKegiatan.kategori || ""}
                          onChange={(e) => setEditingKegiatan({ ...editingKegiatan, kategori: e.target.value })}
                          placeholder="Kategori"
                          className="text-xs"
                        />
                        <Textarea
                          value={editingKegiatan.penjelasan}
                          onChange={(e) => setEditingKegiatan({ ...editingKegiatan, penjelasan: e.target.value })}
                          placeholder="Penjelasan Kegiatan"
                          rows={3}
                          className="text-xs"
                        />
                        <div className="flex gap-2 pt-1">
                          <Button size="sm" onClick={handleSaveKegiatan} className="bg-green-700 hover:bg-green-800 flex-1">
                            <Save className="w-3.5 h-3.5 mr-1" /> Simpan
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingKegiatan(null)} className="flex-1">
                            <X className="w-3.5 h-3.5 mr-1" /> Batal
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-bold text-green-900 text-lg mb-2 leading-snug">{item.judul}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.penjelasan}</p>
                      </>
                    )}
                  </CardContent>
                </div>

                {isAdmin && !editingKegiatan && (
                  <div className="px-5 pb-4 flex justify-end gap-1.5 border-t border-green-50 pt-2 bg-green-50/20">
                    <Button size="sm" variant="ghost" onClick={() => handleEditKegiatan(item)} className="h-8 px-2 text-gray-600 hover:text-green-800">
                      <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteKegiatan(item.id)} className="h-8 px-2 text-red-600 hover:text-red-800">
                      <Trash2 className="w-3.5 h-3.5 mr-1" /> Hapus
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* 8. FASILITAS PONDOK PESANTREN (DIPINDAHKAN DARI PENDAFTARAN) */}
        <div className="max-w-6xl mx-auto mt-16 sm:mt-24 mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="p-2.5 bg-green-700 text-white rounded-2xl shadow-sm">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-green-800">Fasilitas Pondok Pesantren</h2>
              <p className="text-sm text-gray-600">Sarana pendukung kenyamanan ibadah, tempat tinggal, dan pembelajaran santri</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fasilitas.map((item) => (
              <Card key={item.id} className="border-2 border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 rounded-2xl bg-white overflow-hidden group">
                <div className="relative h-48 sm:h-60 w-full overflow-hidden">
                  <Image src={item.foto} alt={item.nama} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <CardContent className="p-5 sm:p-6">
                  <h3 className="font-bold text-green-900 text-lg sm:text-xl mb-2">{item.nama}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.deskripsi}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
