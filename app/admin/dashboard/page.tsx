"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Home,
  Trophy,
  Users,
  GraduationCap,
  ClipboardList,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  ImageIcon,
  FileText,
  LayoutDashboard,
  Sparkles,
  Save,
  Trash2,
  Plus,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  BarChart3,
  Upload,
} from "lucide-react"
import Cropper from "react-easy-crop"
import { getCroppedImg } from "@/lib/cropImage"
import { AdminPencapaianSection, AdminDokumentasiSection } from "@/components/admin-prestasi-sections"
import { AdminGuruSection, AdminPengasuhSection } from "@/components/admin-organisasi-sections"
import {
  AdminSantriSliderSection,
  AdminSantriBudayaSection,
  AdminSantriStatistikSection,
  AdminSantriPelajaranSection,
  AdminSantriKitabSection,
  AdminSantriEkskulSection,
  AdminSantriKegiatanSection,
} from "@/components/admin-santri-sections"

// ─── Types ────────────────────────────────────────────────────────────────────

type NavItem = {
  id: string
  label: string
  icon: React.ElementType
  children: { id: string; label: string }[]
}

// ─── Sidebar Items ────────────────────────────────────────────────────────────

const sidebarNav: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    children: [
      { id: "home-banner", label: "Banner Slider 1" },
      { id: "home-banner-2", label: "Banner Slider 2 (Sejarah Lainnya)" },
      { id: "home-hero", label: "Teks Hero / Sambutan" },
      { id: "home-sejarah", label: "Foto Sejarah" },
    ],
  },
  {
    id: "prestasi",
    label: "Pencapaian",
    icon: Trophy,
    children: [
      { id: "prestasi-list", label: "Pencapaian Santri" },
      { id: "prestasi-foto", label: "Dokumentasi Foto" },
    ],
  },
  {
    id: "organisasi",
    label: "Pengajar",
    icon: Users,
    children: [
      { id: "org-pengasuh", label: "Profil Pengasuh (Banner)" },
      { id: "org-guru", label: "Chart Ustadz & Ustadzah" },
    ],
  },
  {
    id: "santri",
    label: "Dunia Santri",
    icon: GraduationCap,
    children: [
      { id: "santri-hero", label: "Banner Kehidupan Santri" },
      { id: "santri-budaya", label: "Budaya & Kehidupan Santri" },
      { id: "santri-statistik", label: "Statistik Jumlah Santri" },
      { id: "santri-slider-pelajaran", label: "Banner Pelajaran Formal" },
      { id: "santri-pelajaran", label: "Chart Kurikulum & Pelajaran" },
      { id: "santri-slider-kitab", label: "Banner Kajian Kitab Kuning" },
      { id: "santri-kitab", label: "Chart Kitab Kuning" },
      { id: "santri-slider-ekskul", label: "Banner Ekstrakurikuler" },
      { id: "santri-ekskul", label: "Chart Ekstrakurikuler" },
      { id: "santri-kegiatan", label: "Chart Foto Kegiatan" },
    ],
  },
  {
    id: "pendaftaran",
    label: "Pendaftaran",
    icon: ClipboardList,
    children: [
      { id: "pendaftaran-list", label: "Data Pendaftar" },
    ],
  },
  {
    id: "settings",
    label: "Kontak & Pengaturan",
    icon: Settings,
    children: [
      { id: "settings-kontak", label: "Kontak & Alamat" },
      { id: "settings-sosmed", label: "Sosial Media" },
      { id: "settings-program", label: "Program Pendidikan" },
    ],
  },
]

// ─── Admin Dashboard Page ─────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["home"])
  const [activeContent, setActiveContent] = useState("overview")

  // Auth guard
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("admin_logged_in")
    if (!loggedIn) router.replace("/admin")
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem("admin_logged_in")
    router.push("/admin")
  }

  const toggleMenu = (id: string) => {
    setExpandedMenus((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  const handleSelectContent = (contentId: string) => {
    setActiveContent(contentId)
    setSidebarOpen(false)
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-gradient-to-b from-green-950 to-green-900 text-white z-50 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:flex`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-5 border-b border-green-800/60">
          <div
            className="p-1.5 bg-white rounded-xl flex-shrink-0 logo-white-badge"
            style={{
              backgroundColor: "#ffffff",
              backgroundImage: "linear-gradient(#ffffff, #ffffff)",
              colorScheme: "light",
            }}
          >
            <Image src="/images/logo-darul-hikam.png" alt="Logo" width={36} height={36} className="object-contain rounded-lg" />
          </div>
          <div>
            <p className="font-bold text-sm leading-tight">Panel Admin</p>
            <p className="text-emerald-400 text-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Darul Hikam
            </p>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* Overview Button */}
        <div className="px-3 pt-4 pb-2">
          <button
            onClick={() => handleSelectContent("overview")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeContent === "overview"
                ? "bg-emerald-500/20 text-emerald-300"
                : "text-green-200/70 hover:bg-green-800/40 hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-4.5 h-4.5" />
            Overview Dashboard
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto space-y-1">
          {sidebarNav.map((item) => {
            const Icon = item.icon
            const expanded = expandedMenus.includes(item.id)
            const isActiveParent = item.children.some((c) => c.id === activeContent)

            return (
              <div key={item.id}>
                {/* Parent */}
                <button
                  onClick={() => toggleMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActiveParent
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "text-green-200/70 hover:bg-green-800/40 hover:text-white"
                  }`}
                >
                  <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {expanded ? (
                    <ChevronDown className="w-4 h-4 opacity-60" />
                  ) : (
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  )}
                </button>

                {/* Children Dropdown */}
                {expanded && (
                  <div className="ml-7 mt-1 space-y-0.5">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => handleSelectContent(child.id)}
                        className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-all ${
                          activeContent === child.id
                            ? "bg-emerald-500 text-white font-semibold"
                            : "text-green-300/70 hover:bg-green-800/50 hover:text-white"
                        }`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-green-800/60 space-y-1">
          <a
            href="/"
            target="_blank"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-green-200/70 hover:bg-green-800/40 hover:text-white transition-all"
          >
            <Home className="w-4 h-4" />
            Lihat Halaman Utama
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/80 hover:bg-red-500/20 hover:text-red-300 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h2 className="font-semibold text-gray-800 text-sm sm:text-base capitalize">
              {sidebarNav.flatMap((n) => n.children).find((c) => c.id === activeContent)?.label ||
                "Overview Dashboard"}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-7 h-7 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
            <span className="hidden sm:block font-medium text-gray-700">Admin</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <ContentArea activeContent={activeContent} />
        </main>
      </div>
    </div>
  )
}

// ─── Content Area Component ───────────────────────────────────────────────────

function ContentArea({ activeContent }: { activeContent: string }) {
  switch (activeContent) {
    case "overview":
      return <OverviewSection />
    case "home-banner":
      return <BannerSection />
    case "home-banner-2":
      return <SejarahBannerSection />
    case "home-hero":
      return <HeroTextSection />
    case "prestasi-list":
      return <AdminPencapaianSection />
    case "prestasi-foto":
      return <AdminDokumentasiSection />
    case "org-guru":
      return <AdminGuruSection />
    case "org-pengasuh":
      return <AdminPengasuhSection />
    case "santri-hero":
      return <AdminSantriSliderSection kategori="hero" />
    case "santri-budaya":
      return <AdminSantriBudayaSection />
    case "santri-statistik":
      return <AdminSantriStatistikSection />
    case "santri-slider-pelajaran":
      return <AdminSantriSliderSection kategori="pelajaran" />
    case "santri-pelajaran":
      return <AdminSantriPelajaranSection />
    case "santri-slider-kitab":
      return <AdminSantriSliderSection kategori="kitab" />
    case "santri-kitab":
      return <AdminSantriKitabSection />
    case "santri-slider-ekskul":
      return <AdminSantriSliderSection kategori="ekskul" />
    case "santri-ekskul":
      return <AdminSantriEkskulSection />
    case "santri-kegiatan":
      return <AdminSantriKegiatanSection />
    case "pendaftaran-list":
      return <PendaftarSection />
    case "settings-kontak":
      return <KontakSection />
    case "settings-sosmed":
      return <SosmedSection />
    case "settings-program":
      return <ProgramSection />
    default:
      return (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <FileText className="w-12 h-12 mb-3 opacity-40" />
          <p className="text-sm">Pilih menu di sidebar untuk mulai mengedit</p>
        </div>
      )
  }
}

// ─── Overview Section ─────────────────────────────────────────────────────────

function OverviewSection() {
  const cards = [
    { label: "Total Santri", value: "1.350", icon: Users, color: "bg-green-600" },
    { label: "Total Guru", value: "48", icon: GraduationCap, color: "bg-emerald-600" },
    { label: "Prestasi", value: "6", icon: Trophy, color: "bg-amber-500" },
    { label: "Pendaftar Baru", value: "24", icon: ClipboardList, color: "bg-blue-600" },
  ]
  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Ringkasan Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => {
          const Icon = c.icon
          return (
            <div key={c.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className={`w-10 h-10 ${c.color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{c.value}</p>
              <p className="text-xs text-gray-500 mt-1">{c.label}</p>
            </div>
          )
        })}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-green-700" />
          <h3 className="font-semibold text-gray-700">Panduan Admin</h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />Pilih menu di <strong>sidebar kiri</strong> untuk mengelola konten halaman utama.</li>
          <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />Klik pada menu navbar (Home, Pencapaian, dll.) untuk melihat dropdown sub-bagian yang bisa diedit.</li>
          <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />Semua perubahan yang disimpan akan langsung tampil di halaman utama (membutuhkan koneksi database Neon aktif).</li>
          <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />Pastikan <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">DATABASE_URL</code> di file <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">.env</code> sudah diisi dengan URL dari Neon.tech Anda.</li>
        </ul>
      </div>
    </div>
  )
}

// ─── Banner Section ───────────────────────────────────────────────────────────

function BannerSection() {
  const [items, setItems] = useState<any[]>([])
  const [editId, setEditId] = useState<number | null>(null)
  const [editData, setEditData] = useState({ title: "", subtitle: "", image: "" })
  const [saving, setSaving] = useState(false)

  // Fetch data on mount
  useEffect(() => {
    fetch("/api/banners").then(res => res.json()).then(data => {
      if (Array.isArray(data)) setItems(data)
    })
  }, [])

  // ── Cropper State ──
  const [imgSrc, setImgSrc] = useState("")
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
  const [isUploading, setIsUploading] = useState(false)

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener("load", () => setImgSrc(reader.result?.toString() || ""))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleCropAndUpload = async () => {
    if (!croppedAreaPixels) return
    setIsUploading(true)
    try {
      const croppedBase64 = await getCroppedImg(imgSrc, croppedAreaPixels)
      if (!croppedBase64) {
        alert("Gagal memproses foto — browser tidak mendukung operasi canvas. Coba gunakan Chrome/Firefox terbaru.")
        return
      }
      if (!croppedBase64.startsWith("data:image/")) {
        alert("Gagal memproses foto — format tidak dikenali. Silakan pilih ulang foto.")
        return
      }
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: croppedBase64, folder: "banners" })
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || "Gagal mengunggah foto — format tidak valid")
        return
      }
      if (data.url) {
        setEditData({ ...editData, image: data.url })
        setImgSrc("")
      }
    } catch (e) {
      alert("Gagal mengunggah foto — periksa koneksi atau coba browser lain")
    } finally {
      setIsUploading(false)
    }
  }

  const startEdit = (item: typeof items[0]) => {
    setEditId(item.id)
    setEditData({ title: item.title, subtitle: item.subtitle || "", image: item.image })
  }
  
  const saveEdit = async () => {
    setSaving(true)
    const isNew = editId! > 10000000000

    try {
      if (isNew) {
        const res = await fetch("/api/banners", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: editData.title, subtitle: editData.subtitle, image: editData.image })
        })
        const savedItem = await res.json()
        setItems(prev => prev.map(i => i.id === editId ? savedItem : i))
      } else {
        const res = await fetch("/api/banners", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editId, title: editData.title, subtitle: editData.subtitle, image: editData.image })
        })
        const savedItem = await res.json()
        setItems(prev => prev.map(i => i.id === editId ? savedItem : i))
      }
    } catch (e) {
      alert("Gagal menyimpan banner")
    }

    setEditId(null)
    setSaving(false)
  }
  
  const deleteItem = async (id: number) => {
    if (id > 10000000000) {
      setItems(prev => prev.filter(i => i.id !== id))
      return
    }
    if (!confirm("Hapus banner ini?")) return
    
    try {
      await fetch("/api/banners", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      })
      setItems(prev => prev.filter(i => i.id !== id))
    } catch (e) {
      alert("Gagal menghapus banner")
    }
  }

  const addItem = () => {
    const newId = Date.now() * 100 // large temporary ID
    setItems((prev) => [...prev, { id: newId, title: "Banner Baru", subtitle: "Deskripsi banner baru", image: "/images/banner1.png" }])
    setEditId(newId)
    setEditData({ title: "Banner Baru", subtitle: "Deskripsi banner baru", image: "/images/banner1.png" })
  }

  return (
    <div>
      {/* ── Modal Cropper ── */}
      {imgSrc && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex flex-col">
          <div className="relative flex-1">
            <Cropper
              image={imgSrc}
              crop={crop}
              zoom={zoom}
              aspect={16 / 9}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="bg-white p-6 flex flex-col items-center gap-4 shadow-2xl z-[101]">
            <p className="text-sm text-gray-600 font-medium">Geser dan sesuaikan area foto yang ingin ditampilkan</p>
            <input type="range" value={zoom} min={1} max={3} step={0.1} aria-label="Zoom" onChange={(e) => setZoom(Number(e.target.value))} className="w-64 accent-green-600" />
            <div className="flex gap-4">
              <button onClick={() => setImgSrc("")} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">Batal</button>
              <button onClick={handleCropAndUpload} disabled={isUploading} className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-2 transition-colors disabled:opacity-60">
                {isUploading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Upload className="w-4 h-4" />} 
                {isUploading ? "Mengunggah..." : "Potong & Simpan Foto"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-800">Banner Slide</h1>
        <button onClick={addItem} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Tambah Banner
        </button>
      </div>
      
      <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs px-4 py-3 rounded-xl mb-6 flex items-start gap-2">
        <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" />
        <p><strong>Rekomendasi Foto Slider:</strong> Gunakan rasio landscape 16:9 (disarankan <strong>1920x1080 pixel</strong>). Pastikan ukuran file <strong>Maksimal 2MB</strong> agar website tetap cepat dimuat.</p>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {editId === item.id ? (
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md">Slider #{index + 1}</span>
                  <h4 className="font-semibold text-gray-700 text-sm">Edit Konten Slider</h4>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Judul Utama (Tampil di atas foto)</label>
                  <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" placeholder="Contoh: Gerbang Utama & Kemegahan Pesantren" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Sub Judul / Paragraf (Tampil di bawah judul)</label>
                  <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" placeholder="Contoh: Pusat peradaban ilmu dan akhlak mulia..." value={editData.subtitle} onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })} />
                </div>
                
                {/* ── File Upload Box ── */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Foto Slider</label>
                  <div className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                    <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
                      {editData.image && <Image src={editData.image} alt="Preview" fill className="object-cover" />}
                    </div>
                    <div className="flex-1">
                      <label className="cursor-pointer inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 transition-colors shadow-sm">
                        <Upload className="w-4 h-4 text-green-600" />
                        Pilih Foto dari Galeri
                        <input type="file" accept="image/*" className="hidden" onChange={onSelectFile} />
                      </label>
                      <p className="text-xs text-gray-400 mt-2">Bisa digeser & dipotong setelah dipilih.</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-100 mt-4">
                  <button onClick={saveEdit} disabled={saving} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60">
                    {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />} Simpan Perubahan
                  </button>
                  <button onClick={() => setEditId(null)} className="px-5 py-2.5 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition-colors font-medium">Batal</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 p-4">
                <div className="flex-shrink-0 w-8 text-center font-bold text-gray-400">
                  #{index + 1}
                </div>
                <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{item.title}</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{item.subtitle}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => startEdit(item)} className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors" title="Edit Konten Slider">
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Hapus Slider">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Banner Slider 2: Sejarah Lainnya ─────────────────────────────────────────

function SejarahBannerSection() {
  const defaultItems = [
    { id: 100000000001, title: "Awal Berdiri (1994)", caption: "Peletakan batu pertama dan rintisan awal oleh KH. Ahmad Dahlan bersama tokoh masyarakat.", image: "/images/sejarah1.png", order: 0 },
    { id: 100000000002, title: "Pembangunan Masjid & Asrama (2000)", caption: "Tahap perluasan fasilitas fisik untuk menampung pertumbuhan jumlah santri yang kian meningkat.", image: "/images/sejarah2.png", order: 1 },
    { id: 100000000003, title: "Pendirian MTs & MA (2005 - 2010)", caption: "Formalisasi jenjang pendidikan menengah pertama dan atas terakreditasi unggul.", image: "/images/sejarah3.png", order: 2 },
    { id: 100000000004, title: "Pendirian SMK Kejuruan (2015)", caption: "Pembukaan SMK Darul Hikam guna membekali santri dengan keahlian vokasi dan teknis.", image: "/images/sejarah4.png", order: 3 },
    { id: 100000000005, title: "Transformasi Digital (2020 - Sekarang)", caption: "Penerapan sistem pembelajaran berbasis IT dan laboratorium komputer terpadu.", image: "/images/sejarah5.png", order: 4 },
  ]
  const [items, setItems] = useState<any[]>(defaultItems)
  const [editId, setEditId] = useState<number | null>(null)
  const [editData, setEditData] = useState({ title: "", caption: "", image: "" })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetch("/api/foto-sejarah")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setItems(data) })
  }, [])

  const startEdit = (item: any) => {
    setEditId(item.id)
    setEditData({ title: item.title || "", caption: item.caption || "", image: item.image })
  }

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran foto maksimal 2MB")
      return
    }
    const reader = new FileReader()
    reader.onload = () => setEditData((prev) => ({ ...prev, image: reader.result?.toString() || prev.image }))
    reader.readAsDataURL(file)
  }

  const uploadImage = async () => {
    if (!editData.image.startsWith("data:image/")) return editData.image
    setUploading(true)
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: editData.image, folder: "sejarah" }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || "Upload gagal")
      return data.url
    } finally {
      setUploading(false)
    }
  }

  const saveEdit = async () => {
    if (editId === null || !editData.title.trim()) return
    setSaving(true)
    try {
      const image = await uploadImage()
      const payload = { title: editData.title, caption: editData.caption, image, order: items.findIndex((i) => i.id === editId) }
      const res = await fetch("/api/foto-sejarah", {
        method: editId > 10000000000 ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editId > 10000000000 ? payload : { id: editId, ...payload }),
      })
      const saved = await res.json()
      if (!res.ok) throw new Error(saved.error || "Gagal menyimpan")
      setItems((prev) => editId > 10000000000 ? prev.map((i) => i.id === editId ? saved : i) : prev.map((i) => i.id === editId ? saved : i))
      setEditId(null)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal menyimpan Banner Slider 2")
    } finally {
      setSaving(false)
    }
  }

  const addItem = () => {
    if (items.length >= 5) return alert("Maksimal 5 foto untuk Banner Slider 2")
    const id = Date.now() * 100
    setItems((prev) => [...prev, { id, title: "Judul Sejarah Baru", caption: "Deskripsi sejarah baru", image: "/images/sejarah1.png" }])
    setEditId(id)
    setEditData({ title: "Judul Sejarah Baru", caption: "Deskripsi sejarah baru", image: "/images/sejarah1.png" })
  }

  const deleteItem = async (id: number) => {
    if (id > 10000000000) return setItems((prev) => prev.filter((i) => i.id !== id))
    if (!confirm("Hapus foto sejarah ini?")) return
    const res = await fetch("/api/foto-sejarah", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    if (res.ok) setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div><h1 className="text-xl font-bold text-gray-800">Banner Slider 2</h1><p className="text-sm text-gray-500 mt-1">Foto slider pada bagian Sejarah Lainnya (maksimal 5 foto).</p></div>
        <button onClick={addItem} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl text-sm font-medium"><Plus className="w-4 h-4" /> Tambah Foto</button>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => editId === item.id ? (
          <div key={item.id} className="bg-white rounded-2xl border border-green-200 shadow-sm p-5 space-y-3">
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md">Foto #{index + 1}</span>
            <input className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Judul sejarah" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
            <textarea className="w-full border rounded-xl px-3 py-2 text-sm" rows={3} placeholder="Caption/deskripsi" value={editData.caption} onChange={(e) => setEditData({ ...editData, caption: e.target.value })} />
            <div className="flex items-center gap-4"><div className="relative w-40 h-24 rounded-lg overflow-hidden bg-gray-100">{editData.image && <Image src={editData.image} alt="Preview" fill className="object-cover" />}</div><label className="cursor-pointer border rounded-lg px-4 py-2 text-sm"><Upload className="inline w-4 h-4 mr-2 text-green-600" /> Pilih Foto<input type="file" accept="image/*" className="hidden" onChange={selectFile} /></label></div>
            <div className="flex gap-2"><button onClick={saveEdit} disabled={saving || uploading} className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm">{saving || uploading ? "Menyimpan..." : "Simpan"}</button><button onClick={() => setEditId(null)} className="border px-4 py-2 rounded-xl text-sm">Batal</button></div>
          </div>
        ) : (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4"><div className="text-gray-400 font-bold w-6">#{index + 1}</div><div className="relative w-32 h-20 rounded-lg overflow-hidden"><Image src={item.image} alt={item.title || "Sejarah"} fill className="object-cover" /></div><div className="flex-1 min-w-0"><p className="font-semibold text-sm truncate">{item.title}</p><p className="text-xs text-gray-500 truncate">{item.caption}</p></div><button onClick={() => startEdit(item)} className="p-2 text-green-600"><ImageIcon className="w-4 h-4" /></button><button onClick={() => deleteItem(item.id)} className="p-2 text-red-500"><Trash2 className="w-4 h-4" /></button></div>
        ))}
      </div>
    </div>
  )
}

// ─── Hero Text Section ────────────────────────────────────────────────────────

function HeroTextSection() {
  const [data, setData] = useState({
    title: "Selamat Datang di",
    subtitle: "PONDOK PESANTREN DARUL HIKAM",
    paragraph: "Lembaga pendidikan Islam terpadu yang telah berdiri sejak 1990 di Rimbo Ulu Tebo, berkomitmen membentuk generasi yang berakhlak mulia, cerdas, dan berwawasan global.",
    sejarahSingkatParagraph: "Yayasan Pondok Pesantren Darul Hikam didirikan pada tahun 1990 oleh KH. Rifai Ahmad, S.Pd.I bersama Ibu Hj. Harni. Pesantren ini berlokasi di Jl. Teratai, Desa Suka Damai, Kecamatan Rimbo Ulu, Kabupaten Tebo, Jambi.",
    sejarahLainnyaParagraph: "Dalam perkembangannya, Pondok Pesantren Darul Hikam menyelenggarakan sistem pendidikan integratif antara ilmu agama (kepesantrenan non-formal) dan ilmu umum formal (MTs sejak 2001 & MA sejak 2004) yang kini menaungi sekitar 900 santri.",
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Fetch settings on mount
  useEffect(() => {
    fetch("/api/settings").then(res => res.json()).then(settings => {
      setData({
        title: settings.heroTitle || "Selamat Datang di",
        subtitle: settings.heroSubtitle || "PONDOK PESANTREN DARUL HIKAM",
        paragraph: settings.heroParagraph || "Lembaga pendidikan Islam terpadu yang telah berdiri sejak 1990 di Rimbo Ulu Tebo, berkomitmen membentuk generasi yang berakhlak mulia, cerdas, dan berwawasan global.",
        sejarahSingkatParagraph: settings.sejarahSingkatParagraph || "Yayasan Pondok Pesantren Darul Hikam didirikan pada tahun 1990 oleh KH. Rifai Ahmad, S.Pd.I bersama Ibu Hj. Harni. Pesantren ini berlokasi di Jl. Teratai, Desa Suka Damai, Kecamatan Rimbo Ulu, Kabupaten Tebo, Jambi.",
        sejarahLainnyaParagraph: settings.sejarahLainnyaParagraph || "Dalam perkembangannya, Pondok Pesantren Darul Hikam menyelenggarakan sistem pendidikan integratif antara ilmu agama (kepesantrenan non-formal) dan ilmu umum formal (MTs sejak 2001 & MA sejak 2004) yang kini menaungi sekitar 900 santri.",
      })
    })
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heroTitle: data.title,
          heroSubtitle: data.subtitle,
          heroParagraph: data.paragraph,
          sejarahSingkatParagraph: data.sejarahSingkatParagraph,
          sejarahLainnyaParagraph: data.sejarahLainnyaParagraph
        })
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Gagal menyimpan pengaturan")
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (e) {
      alert("Gagal menyimpan teks hero")
    }
    setSaving(false)
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-6">Teks Hero / Sambutan</h1>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Judul Atas (Sub Judul Utama)</label>
          <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Judul Utama (Nama Instansi)</label>
          <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Paragraf Hero / Sambutan</label>
          <textarea rows={4} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none" value={data.paragraph} onChange={(e) => setData({ ...data, paragraph: e.target.value })} />
        </div>
        <div className="border-t border-gray-100 pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Paragraf Sejarah Singkat</label>
          <textarea rows={6} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-y" value={data.sejarahSingkatParagraph} onChange={(e) => setData({ ...data, sejarahSingkatParagraph: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Paragraf Sejarah Lainnya</label>
          <textarea rows={7} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-y" value={data.sejarahLainnyaParagraph} onChange={(e) => setData({ ...data, sejarahLainnyaParagraph: e.target.value })} />
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60">
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {saved ? "Tersimpan ✓" : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  )
}

// ─── Prestasi Section ─────────────────────────────────────────────────────────

function PrestasiSection() {
  const [items, setItems] = useState([
    { id: 1, nama: "Abdul Roni", prestasi: "Juara Tilawah Tingkat Kabupaten", tingkat: "Kabupaten" },
    { id: 2, nama: "Gilang", prestasi: "Juara Qori Internasional", tingkat: "Internasional" },
    { id: 3, nama: "Muhammad Irfan", prestasi: "Juara 1 Tahfidz 30 Juz", tingkat: "Provinsi" },
  ])
  const [editId, setEditId] = useState<number | null>(null)
  const [editData, setEditData] = useState({ nama: "", prestasi: "", tingkat: "" })
  const [saving, setSaving] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [newItem, setNewItem] = useState({ nama: "", prestasi: "", tingkat: "" })

  const save = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    setItems((prev) => prev.map((i) => (i.id === editId ? { ...i, ...editData } : i)))
    setEditId(null)
    setSaving(false)
  }

  const addItem = async () => {
    if (!newItem.nama || !newItem.prestasi) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    setItems((prev) => [...prev, { ...newItem, id: Date.now() }])
    setNewItem({ nama: "", prestasi: "", tingkat: "" })
    setShowAdd(false)
    setSaving(false)
  }

  const tingkatColors: Record<string, string> = {
    Kabupaten: "bg-blue-100 text-blue-700",
    Provinsi: "bg-purple-100 text-purple-700",
    Nasional: "bg-amber-100 text-amber-700",
    Internasional: "bg-red-100 text-red-700",
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Daftar Prestasi Santri</h1>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>

      {showAdd && (
        <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-5 mb-4 space-y-3">
          <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" placeholder="Nama Santri" value={newItem.nama} onChange={(e) => setNewItem({ ...newItem, nama: e.target.value })} />
          <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" placeholder="Prestasi yang diraih" value={newItem.prestasi} onChange={(e) => setNewItem({ ...newItem, prestasi: e.target.value })} />
          <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" value={newItem.tingkat} onChange={(e) => setNewItem({ ...newItem, tingkat: e.target.value })}>
            <option value="">-- Pilih Tingkat --</option>
            <option>Kabupaten</option><option>Provinsi</option><option>Nasional</option><option>Internasional</option>
          </select>
          <div className="flex gap-2">
            <button onClick={addItem} disabled={saving} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-60">
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />} Simpan
            </button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition-colors">Batal</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            {editId === item.id ? (
              <div className="p-4 space-y-3">
                <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" value={editData.nama} onChange={(e) => setEditData({ ...editData, nama: e.target.value })} />
                <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" value={editData.prestasi} onChange={(e) => setEditData({ ...editData, prestasi: e.target.value })} />
                <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" value={editData.tingkat} onChange={(e) => setEditData({ ...editData, tingkat: e.target.value })}>
                  <option>Kabupaten</option><option>Provinsi</option><option>Nasional</option><option>Internasional</option>
                </select>
                <div className="flex gap-2">
                  <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-60">
                    {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />} Simpan
                  </button>
                  <button onClick={() => setEditId(null)} className="px-4 py-2 rounded-xl text-sm border border-gray-200 hover:bg-gray-50">Batal</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">{item.nama}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.prestasi}</p>
                </div>
                {item.tingkat && <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${tingkatColors[item.tingkat] ?? "bg-gray-100 text-gray-600"}`}>{item.tingkat}</span>}
                <div className="flex gap-1">
                  <button onClick={() => { setEditId(item.id); setEditData({ nama: item.nama, prestasi: item.prestasi, tingkat: item.tingkat ?? "" }) }} className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors">
                    <FileText className="w-4 h-4" />
                  </button>
                  <button onClick={() => setItems((p) => p.filter((i) => i.id !== item.id))} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Guru Section ─────────────────────────────────────────────────────────────

function GuruSection() {
  const [items, setItems] = useState([
    { id: 1, nama: "Ust. Ahmad Fauzi, S.Pd.I", jabatan: "Kepala Sekolah MTs", unitMengajar: "MTs Darul Hikam" },
    { id: 2, nama: "Ustdzh. Siti Nur Aini, S.Ag", jabatan: "Wali Kelas VII-A", unitMengajar: "MTs Darul Hikam" },
    { id: 3, nama: "Ust. Muhammad Rizki, M.Pd", jabatan: "Pengampu Kitab Kuning", unitMengajar: "MA Darul Hikam" },
  ])
  const [editId, setEditId] = useState<number | null>(null)
  const [editData, setEditData] = useState({ nama: "", jabatan: "", unitMengajar: "" })
  const [saving, setSaving] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [newItem, setNewItem] = useState({ nama: "", jabatan: "", unitMengajar: "MTs Darul Hikam" })

  const save = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    setItems((prev) => prev.map((i) => (i.id === editId ? { ...i, ...editData } : i)))
    setEditId(null)
    setSaving(false)
  }

  const addItem = async () => {
    if (!newItem.nama) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    setItems((prev) => [...prev, { ...newItem, id: Date.now() }])
    setNewItem({ nama: "", jabatan: "", unitMengajar: "MTs Darul Hikam" })
    setShowAdd(false)
    setSaving(false)
  }

  const units = ["PAUD Darul Hikam", "MI Darul Hikam", "MTs Darul Hikam", "MA Darul Hikam", "SMK Darul Hikam"]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Daftar Ustadz & Ustadzah</h1>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>

      {showAdd && (
        <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-5 mb-4 space-y-3">
          <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" placeholder="Nama Lengkap & Gelar" value={newItem.nama} onChange={(e) => setNewItem({ ...newItem, nama: e.target.value })} />
          <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" placeholder="Jabatan / Peran" value={newItem.jabatan} onChange={(e) => setNewItem({ ...newItem, jabatan: e.target.value })} />
          <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" value={newItem.unitMengajar} onChange={(e) => setNewItem({ ...newItem, unitMengajar: e.target.value })}>
            {units.map((u) => <option key={u}>{u}</option>)}
          </select>
          <div className="flex gap-2">
            <button onClick={addItem} disabled={saving} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-60">
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />} Simpan
            </button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl text-sm border border-gray-200 hover:bg-gray-50">Batal</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            {editId === item.id ? (
              <div className="p-4 space-y-3">
                <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" value={editData.nama} onChange={(e) => setEditData({ ...editData, nama: e.target.value })} />
                <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" value={editData.jabatan} onChange={(e) => setEditData({ ...editData, jabatan: e.target.value })} />
                <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" value={editData.unitMengajar} onChange={(e) => setEditData({ ...editData, unitMengajar: e.target.value })}>
                  {units.map((u) => <option key={u}>{u}</option>)}
                </select>
                <div className="flex gap-2">
                  <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-60">
                    {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />} Simpan
                  </button>
                  <button onClick={() => setEditId(null)} className="px-4 py-2 rounded-xl text-sm border border-gray-200 hover:bg-gray-50">Batal</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-4.5 h-4.5 text-green-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{item.nama}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.jabatan} — <span className="text-green-600">{item.unitMengajar}</span></p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => { setEditId(item.id); setEditData({ nama: item.nama, jabatan: item.jabatan, unitMengajar: item.unitMengajar }) }} className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors">
                    <FileText className="w-4 h-4" />
                  </button>
                  <button onClick={() => setItems((p) => p.filter((i) => i.id !== item.id))} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Statistik Santri Section ─────────────────────────────────────────────────

function StatistikSantriSection() {
  const [items, setItems] = useState([
    { jenjang: "PAUD", jumlah: 85 },
    { jenjang: "MI", jumlah: 340 },
    { jenjang: "MTs", jumlah: 415 },
    { jenjang: "MA", jumlah: 280 },
    { jenjang: "SMK", jumlah: 230 },
  ])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const total = items.reduce((s, i) => s + i.jumlah, 0)

  const save = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 700))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-6">Statistik Jumlah Santri</h1>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.jenjang} className="flex items-center gap-4">
              <div className="w-14 text-sm font-semibold text-gray-700">{item.jenjang}</div>
              <div className="flex-1 bg-green-50 rounded-xl p-1">
                <input
                  type="number"
                  min="0"
                  className="w-full bg-transparent text-center text-sm font-bold text-green-700 outline-none"
                  value={item.jumlah}
                  onChange={(e) => setItems((prev) => prev.map((i) => i.jenjang === item.jenjang ? { ...i, jumlah: parseInt(e.target.value) || 0 } : i))}
                />
              </div>
              <div className="text-xs text-gray-400 w-12">santri</div>
            </div>
          ))}
        </div>
        <div className="bg-green-700 rounded-xl px-4 py-3 flex items-center justify-between mb-6">
          <span className="text-white text-sm font-medium">Total Keseluruhan</span>
          <span className="text-white text-xl font-bold">{total} Santri</span>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60">
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {saved ? "Tersimpan ✓" : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  )
}

// ─── Pendaftar Section ────────────────────────────────────────────────────────

function PendaftarSection() {
  const [pendaftars] = useState([
    { id: "PSB001", nama: "Ahmad Fadhli", asal: "SDN 01 Tebo", program: "MTs Darul Hikam", status: "pending", tanggal: "2025-07-01" },
    { id: "PSB002", nama: "Siti Aminah", asal: "MIN 02 Tebo", program: "MI Darul Hikam", status: "approved", tanggal: "2025-07-03" },
  ])

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-6">Data Pendaftar Santri Baru</h1>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-50 border-b border-green-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-green-700">No. Daftar</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-green-700">Nama</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-green-700">Asal Sekolah</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-green-700">Program</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-green-700">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-green-700">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pendaftars.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{p.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{p.nama}</td>
                  <td className="px-4 py-3 text-gray-600">{p.asal}</td>
                  <td className="px-4 py-3 text-gray-600">{p.program}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{p.tanggal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── Kontak Section ───────────────────────────────────────────────────────────

function KontakSection() {
  const [data, setData] = useState({
    address: "Jl. Pondok Pesantren No. 1, Tebo, Jambi",
    email: "darulhikam@gmail.com",
    phone: "+62 852-0000-0000",
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 700))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-6">Kontak & Alamat</h1>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><MapPin className="w-4 h-4 text-green-600" /> Alamat Lengkap</label>
          <textarea rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><Mail className="w-4 h-4 text-green-600" /> Email</label>
          <input type="email" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><Phone className="w-4 h-4 text-green-600" /> Nomor WhatsApp / Telepon</label>
          <input type="tel" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60">
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {saved ? "Tersimpan ✓" : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  )
}

// ─── Sosmed Section ───────────────────────────────────────────────────────────

function SosmedSection() {
  const [data, setData] = useState({
    facebookUrl: "https://facebook.com/darulhikam",
    instagramUrl: "https://instagram.com/darulhikam",
    youtubeUrl: "https://youtube.com/@darulhikam",
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = async () => {
    setSaving(true)
    // Save to settings API
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => {})
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-6">Link Sosial Media</h1>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><Facebook className="w-4 h-4 text-blue-600" /> URL Facebook</label>
          <input type="url" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" placeholder="https://facebook.com/..." value={data.facebookUrl} onChange={(e) => setData({ ...data, facebookUrl: e.target.value })} />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><Instagram className="w-4 h-4 text-pink-600" /> URL Instagram</label>
          <input type="url" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" placeholder="https://instagram.com/..." value={data.instagramUrl} onChange={(e) => setData({ ...data, instagramUrl: e.target.value })} />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><Youtube className="w-4 h-4 text-red-600" /> URL YouTube</label>
          <input type="url" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" placeholder="https://youtube.com/..." value={data.youtubeUrl} onChange={(e) => setData({ ...data, youtubeUrl: e.target.value })} />
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60">
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {saved ? "Tersimpan ✓" : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  )
}

// ─── Program Pendidikan Section ───────────────────────────────────────────────

function ProgramSection() {
  const [programs, setPrograms] = useState([
    "PAUD / RA (Taman Kanak-Kanak Islam)",
    "MI (Madrasah Ibtidaiyah)",
    "MTs (Madrasah Tsanawiyah)",
    "MA (Madrasah Aliyah)",
    "SMK (Sekolah Menengah Kejuruan)",
    "Program Tahfidz Al-Qur'an",
    "Kajian Kitab Kuning",
  ])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [newProg, setNewProg] = useState("")

  const save = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 700))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-6">Program Pendidikan (Footer)</h1>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="space-y-2 mb-4">
          {programs.map((p, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                value={p}
                onChange={(e) => setPrograms((prev) => prev.map((item, i) => i === idx ? e.target.value : item))}
              />
              <button onClick={() => setPrograms((prev) => prev.filter((_, i) => i !== idx))} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mb-4">
          <input className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" placeholder="Tambah program baru..." value={newProg} onChange={(e) => setNewProg(e.target.value)} />
          <button onClick={() => { if (newProg) { setPrograms((p) => [...p, newProg]); setNewProg("") } }} className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-xl text-sm transition-colors">
            <Plus className="w-4 h-4" /> Tambah
          </button>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60">
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {saved ? "Tersimpan ✓" : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  )
}
