"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Award, Edit, Save, X, Plus, Trash2, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface SlidePhotoItem {
  id: number
  title: string
  caption: string
  image: string
}

const DEFAULT_SLIDE_PHOTOS: SlidePhotoItem[] = [
  {
    id: 1,
    title: "Awal Berdiri (1994)",
    caption: "Peletakan batu pertama dan rintisan awal oleh KH. Ahmad Dahlan bersama tokoh masyarakat.",
    image: "/images/sejarah1.png",
  },
  {
    id: 2,
    title: "Pembangunan Masjid & Asrama (2000)",
    caption: "Tahap perluasan fasilitas fisik untuk menampung pertumbuhan jumlah santri yang kian meningkat.",
    image: "/images/sejarah2.png",
  },
  {
    id: 3,
    title: "Pendirian MTs & MA (2005 - 2010)",
    caption: "Formalisasi jenjang pendidikan menengah pertama dan atas terakreditasi unggul.",
    image: "/images/sejarah3.png",
  },
  {
    id: 4,
    title: "Pendirian SMK Kejuruan (2015)",
    caption: "Pembukaan SMK Darul Hikam guna membekali santri dengan keahlian vokasi dan teknis.",
    image: "/images/sejarah4.png",
  },
  {
    id: 5,
    title: "Transformasi Digital (2020 - Sekarang)",
    caption: "Penerapan sistem pembelajaran berbasis IT dan laboratorium komputer terpadu.",
    image: "/images/sejarah5.png",
  },
]

interface FotoItem {
  id: number
  nama: string
  deskripsi: string
  foto: string
}

interface PencapaianTextItem {
  id: number
  nama: string
  prestasi: string
  tingkat?: string
}

interface PrestasiProps {
  isAdmin?: boolean
}

export function Prestasi({ isAdmin = false }: PrestasiProps) {
  // Slideshow Photos State (Moved from Home)
  const [slidePhotos, setSlidePhotos] = useState<SlidePhotoItem[]>(DEFAULT_SLIDE_PHOTOS)
  const [currentSlidePhoto, setCurrentSlidePhoto] = useState(0)

  useEffect(() => {
    fetch("/api/foto-sejarah")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSlidePhotos(data.map((item) => ({ ...item, title: item.title || "Dokumentasi Darul Hikam", caption: item.caption || "" })))
        }
      })
      .catch(() => { /* keep default slide photos */ })
  }, [])

  useEffect(() => {
    if (slidePhotos.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlidePhoto((prev) => (prev + 1) % slidePhotos.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slidePhotos.length])

  const nextSlidePhoto = () => {
    if (slidePhotos.length === 0) return
    setCurrentSlidePhoto((prev) => (prev + 1) % slidePhotos.length)
  }

  const prevSlidePhoto = () => {
    if (slidePhotos.length === 0) return
    setCurrentSlidePhoto((prev) => (prev - 1 + slidePhotos.length) % slidePhotos.length)
  }

  // Dokumentasi Foto State
  const [dokumentasiFoto, setDokumentasiFoto] = useState<FotoItem[]>([
    {
      id: 1,
      nama: "Kegiatan Tahfidz Al-Qur'an",
      deskripsi: "Santri sedang mengikuti setoran dan muraja'ah hafalan Al-Qur'an harian.",
      foto: "/images/banner2.png",
    },
    {
      id: 2,
      nama: "Olimpiade Sains & Keagamaan",
      deskripsi: "Dokumentasi keikutsertaan santri dalam olimpiade tingkat kabupaten & provinsi.",
      foto: "/images/banner5.png",
    },
    {
      id: 3,
      nama: "Wisuda & Haflah Akhirussanah",
      deskripsi: "Prosesi wisuda kelulusan santri dan penyerahan penghargaan santri berprestasi.",
      foto: "/images/banner1.png",
    },
  ])

  const [editingFoto, setEditingFoto] = useState<FotoItem | null>(null)
  const [showAddFotoForm, setShowAddFotoForm] = useState(false)
  const [newFoto, setNewFoto] = useState<Omit<FotoItem, "id">>({
    nama: "",
    deskripsi: "",
    foto: "/images/banner1.png",
  })
  const [uploadingImage, setUploadingImage] = useState<number | null>(null)

  // Beberapa Pencapaian Lainnya State (Text List)
  const [pencapaianLainnya, setPencapaianLainnya] = useState<PencapaianTextItem[]>([
    {
      id: 1,
      nama: "Abdul Roni",
      prestasi: "Juara Tilawah Tingkat Kabupaten",
      tingkat: "Kabupaten",
    },
    {
      id: 2,
      nama: "Gilang",
      prestasi: "Juara Qori Internasional",
      tingkat: "Internasional",
    },
    {
      id: 3,
      nama: "Muhammad Irfan",
      prestasi: "Juara 1 Tahfidz 30 Juz",
      tingkat: "Provinsi",
    },
    {
      id: 4,
      nama: "Aisyah Nur",
      prestasi: "Juara 1 Kaligrafi Islami",
      tingkat: "Nasional",
    },
    {
      id: 5,
      nama: "Fahmi & Tim",
      prestasi: "Juara 1 Lomba Programming & Web Design",
      tingkat: "Nasional",
    },
    {
      id: 6,
      nama: "Siti Fatimah",
      prestasi: "Juara 1 Pidato Bahasa Arab",
      tingkat: "Kabupaten",
    },
  ])

  const [editingPencapaian, setEditingPencapaian] = useState<PencapaianTextItem | null>(null)
  const [showAddPencapaianForm, setShowAddPencapaianForm] = useState(false)
  const [newPencapaian, setNewPencapaian] = useState<Omit<PencapaianTextItem, "id">>({
    nama: "",
    prestasi: "",
    tingkat: "",
  })

  useEffect(() => {
    fetch("/api/prestasi")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setPencapaianLainnya(data)
      })
      .catch(() => { /* keep fallback achievements */ })

    fetch("/api/foto-kegiatan")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDokumentasiFoto(data.map((item) => ({ id: item.id, nama: item.nama, deskripsi: item.deskripsi || "", foto: item.foto })))
        }
      })
      .catch(() => { /* keep fallback documentation photos */ })
  }, [])

  // Foto Handlers
  const handleEditFoto = (foto: FotoItem) => {
    setEditingFoto({ ...foto })
  }

  const handleSaveFoto = async () => {
    if (!editingFoto) return
    try {
      let foto = editingFoto.foto
      if (foto.startsWith("data:image/")) {
        const upload = await fetch("/api/upload", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: foto, folder: "prestasi" }) })
        const uploadData = await upload.json()
        if (!upload.ok || !uploadData.url) throw new Error(uploadData.error || "Upload foto gagal")
        foto = uploadData.url
      }
      const response = await fetch("/api/foto-kegiatan", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editingFoto.id, nama: editingFoto.nama, deskripsi: editingFoto.deskripsi, foto }) })
      const saved = await response.json()
      if (!response.ok) throw new Error(saved.error || "Gagal menyimpan foto")
      setDokumentasiFoto((prev) => prev.map((item) => (item.id === editingFoto.id ? saved : item)))
      setEditingFoto(null)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal menyimpan foto")
    }
  }

  const handleDeleteFoto = async (id: number) => {
    try {
      const response = await fetch("/api/foto-kegiatan", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
      if (!response.ok) throw new Error("Gagal menghapus foto")
      setDokumentasiFoto((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal menghapus foto")
    }
  }

  const handleAddFoto = () => {
    if (newFoto.nama && newFoto.deskripsi && dokumentasiFoto.length < 5) {
      const fotoWithId = { ...newFoto, id: Date.now() }
      setDokumentasiFoto((prev) => [...prev, fotoWithId])
      setNewFoto({
        nama: "",
        deskripsi: "",
        foto: "/images/banner1.png",
      })
      setShowAddFotoForm(false)
    }
  }

  const handleFotoUpload = (file: File, itemId: number) => {
    if (file && file.type.startsWith("image/")) {
      setUploadingImage(itemId)
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setDokumentasiFoto((prev) => prev.map((item) => (item.id === itemId ? { ...item, foto: imageUrl } : item)))
        setUploadingImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  // Pencapaian Handlers
  const handleEditPencapaian = (item: PencapaianTextItem) => {
    setEditingPencapaian({ ...item })
  }

  const handleSavePencapaian = () => {
    if (editingPencapaian) {
      setPencapaianLainnya((prev) => prev.map((item) => (item.id === editingPencapaian.id ? editingPencapaian : item)))
      setEditingPencapaian(null)
    }
  }

  const handleDeletePencapaian = (id: number) => {
    setPencapaianLainnya((prev) => prev.filter((item) => item.id !== id))
  }

  const handleAddPencapaian = () => {
    if (newPencapaian.nama && newPencapaian.prestasi) {
      setPencapaianLainnya((prev) => [...prev, { ...newPencapaian, id: Date.now() }])
      setNewPencapaian({ nama: "", prestasi: "", tingkat: "" })
      setShowAddPencapaianForm(false)
    }
  }

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-green-50/50 animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-700 ease-out">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-3">
            Pencapaian Santri
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dokumentasi serta berbagai pencapaian membanggakan yang telah diraih oleh santri Pondok Pesantren DARUL HIKAM.
          </p>
        </div>

        {/* Photo Slideshow Section (Dipindahkan dari Home) */}
        <div className="max-w-5xl mx-auto mb-14 sm:mb-18">
          <Card className="overflow-hidden border-2 border-green-200 shadow-xl rounded-2xl bg-white">
            <CardContent className="p-4 sm:p-6">
              <div className="relative h-[260px] sm:h-[360px] md:h-[420px] rounded-xl overflow-hidden mb-4">
                {slidePhotos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      idx === currentSlidePhoto ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={photo.image}
                      alt={photo.title}
                      fill
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
                      <h4 className="text-lg sm:text-2xl font-bold drop-shadow-md">{photo.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-200 mt-1 drop-shadow leading-relaxed">{photo.caption}</p>
                    </div>
                  </div>
                ))}

                {/* Slider Arrows */}
                <button
                  onClick={prevSlidePhoto}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-md" />
                </button>
                <button
                  onClick={nextSlidePhoto}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-md" />
                </button>
              </div>

              {/* Photo Thumbnails / Controls */}
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {slidePhotos.map((photo, idx) => (
                  <button
                    key={photo.id}
                    onClick={() => setCurrentSlidePhoto(idx)}
                    className={`relative h-14 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      idx === currentSlidePhoto ? "border-green-600 ring-2 ring-green-400 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={photo.image}
                      alt={photo.title}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 1. Dokumentasi Foto (Bentuk Chart / Kotak Grid) */}
        <div className="mb-14 sm:mb-18">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-800">Dokumentasi Foto</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Galeri foto kegiatan dan momen berharga prestasi pesantren</p>
            {isAdmin && (
              <div className="mt-3 flex justify-center">
                <Button
                  onClick={() => setShowAddFotoForm(!showAddFotoForm)}
                  disabled={dokumentasiFoto.length >= 5}
                  className="bg-green-700 hover:bg-green-800"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Foto ({dokumentasiFoto.length}/5)
                </Button>
              </div>
            )}
          </div>

          {/* Add Foto Form (Admin) */}
          {showAddFotoForm && isAdmin && (
            <Card className="mb-6 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 text-lg sm:text-xl">Tambah Dokumentasi Foto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nama/Judul Foto"
                    value={newFoto.nama}
                    onChange={(e) => setNewFoto({ ...newFoto, nama: e.target.value })}
                    className="text-base"
                  />
                  <Input
                    placeholder="URL Foto"
                    value={newFoto.foto}
                    onChange={(e) => setNewFoto({ ...newFoto, foto: e.target.value })}
                    className="text-base"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">atau</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = (e) => {
                            setNewFoto({ ...newFoto, foto: e.target?.result as string })
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                      className="text-sm flex-1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Textarea
                      placeholder="Deskripsi Foto"
                      value={newFoto.deskripsi}
                      onChange={(e) => setNewFoto({ ...newFoto, deskripsi: e.target.value })}
                      rows={3}
                      className="text-base"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:col-span-2">
                    <Button onClick={handleAddFoto} className="bg-green-700 hover:bg-green-800 flex-1 sm:flex-none">
                      <Save className="w-4 h-4 mr-2" />
                      Simpan
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddFotoForm(false)} className="flex-1 sm:flex-none">
                      <X className="w-4 h-4 mr-2" />
                      Batal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Grid Chart Box Foto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dokumentasiFoto.map((foto) => (
              <Card key={foto.id} className="border-2 border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white">
                <div className="relative h-48 sm:h-56 w-full">
                  <Image
                    src={foto.foto || "/placeholder.svg"}
                    alt={foto.nama}
                    fill
                    className="object-cover"
                  />
                  {isAdmin && (
                    <>
                      <div className="absolute top-2 right-2 flex gap-1 z-10">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditFoto(foto)}
                          className="bg-white/90 hover:bg-white p-2 text-green-800"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteFoto(foto.id)}
                          className="bg-white/90 hover:bg-white text-red-600 hover:text-red-700 p-2"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 left-2 z-10">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFotoUpload(file, foto.id)
                          }}
                          className="hidden"
                          id={`upload-foto-${foto.id}`}
                        />
                        <label
                          htmlFor={`upload-foto-${foto.id}`}
                          className="bg-white/90 hover:bg-white text-green-800 px-2 py-1 rounded text-xs cursor-pointer flex items-center gap-1 touch-manipulation font-medium shadow"
                        >
                          📷 Ganti Foto
                        </label>
                      </div>
                    </>
                  )}
                  {uploadingImage === foto.id && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                      <span className="text-white text-sm">Uploading...</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4 sm:p-5">
                  {editingFoto?.id === foto.id ? (
                    <div className="space-y-3">
                      <Input
                        value={editingFoto.nama}
                        onChange={(e) => setEditingFoto({ ...editingFoto, nama: e.target.value })}
                        placeholder="Nama Foto"
                        className="text-sm sm:text-base"
                      />
                      <Textarea
                        value={editingFoto.deskripsi}
                        onChange={(e) => setEditingFoto({ ...editingFoto, deskripsi: e.target.value })}
                        placeholder="Deskripsi"
                        rows={3}
                        className="text-sm sm:text-base"
                      />
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          size="sm"
                          onClick={handleSaveFoto}
                          className="bg-green-700 hover:bg-green-800 flex-1 sm:flex-none"
                        >
                          <Save className="w-3 h-3 mr-1" />
                          Simpan
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingFoto(null)}
                          className="flex-1 sm:flex-none"
                        >
                          <X className="w-3 h-3 mr-1" />
                          Batal
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-bold text-green-800 mb-1.5 text-base sm:text-lg">{foto.nama}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{foto.deskripsi}</p>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 2. Sub Judul: Beberapa Pencapaian Lainnya (Isi Tulisan List) */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border-2 border-green-200 p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-green-100 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-100 text-green-800 rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-green-800">Beberapa Pencapaian Lainnya</h2>
                <p className="text-xs sm:text-sm text-gray-500">Daftar kejuaraan dan perlombaan yang berhasil diraih santri</p>
              </div>
            </div>
            {isAdmin && (
              <Button
                onClick={() => setShowAddPencapaianForm(!showAddPencapaianForm)}
                className="bg-green-700 hover:bg-green-800 w-full sm:w-auto"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Pencapaian
              </Button>
            )}
          </div>

          {/* Add Form Pencapaian (Admin) */}
          {showAddPencapaianForm && isAdmin && (
            <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <h3 className="text-sm font-bold text-green-800 mb-3">Tambah Pencapaian Baru</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <Input
                  placeholder="Nama Santri (cth: Abdul Roni)"
                  value={newPencapaian.nama}
                  onChange={(e) => setNewPencapaian({ ...newPencapaian, nama: e.target.value })}
                />
                <Input
                  placeholder="Judul Prestasi (cth: Juara Tilawah)"
                  value={newPencapaian.prestasi}
                  onChange={(e) => setNewPencapaian({ ...newPencapaian, prestasi: e.target.value })}
                />
                <Input
                  placeholder="Tingkat (cth: Kabupaten / Internasional)"
                  value={newPencapaian.tingkat}
                  onChange={(e) => setNewPencapaian({ ...newPencapaian, tingkat: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddPencapaian} className="bg-green-700 hover:bg-green-800">
                  <Save className="w-3.5 h-3.5 mr-1" /> Simpan
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowAddPencapaianForm(false)}>
                  <X className="w-3.5 h-3.5 mr-1" /> Batal
                </Button>
              </div>
            </div>
          )}

          {/* List Tulisan Pencapaian */}
          <div className="space-y-3">
            {pencapaianLainnya.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-green-50/70 hover:bg-green-100/60 transition-colors border border-green-100"
              >
                {editingPencapaian?.id === item.id ? (
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 mr-3">
                    <Input
                      value={editingPencapaian.nama}
                      onChange={(e) => setEditingPencapaian({ ...editingPencapaian, nama: e.target.value })}
                      placeholder="Nama"
                    />
                    <Input
                      value={editingPencapaian.prestasi}
                      onChange={(e) => setEditingPencapaian({ ...editingPencapaian, prestasi: e.target.value })}
                      placeholder="Prestasi"
                    />
                    <Input
                      value={editingPencapaian.tingkat || ""}
                      onChange={(e) => setEditingPencapaian({ ...editingPencapaian, tingkat: e.target.value })}
                      placeholder="Tingkat"
                    />
                  </div>
                ) : (
                  <div className="flex items-start sm:items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <div>
                      <span className="font-semibold text-green-900 text-sm sm:text-base">
                        {item.nama}
                      </span>
                      <span className="text-gray-700 text-sm sm:text-base"> — {item.prestasi}</span>
                      {item.tingkat && (
                        <span className="ml-2 inline-block px-2 py-0.5 text-xs font-medium bg-green-200 text-green-800 rounded-full">
                          {item.tingkat}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {isAdmin && (
                  <div className="flex items-center gap-1.5 ml-2">
                    {editingPencapaian?.id === item.id ? (
                      <>
                        <Button size="sm" onClick={handleSavePencapaian} className="bg-green-700 hover:bg-green-800 p-1.5 h-8">
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingPencapaian(null)} className="p-1.5 h-8">
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => handleEditPencapaian(item)} className="p-1.5 h-8 text-gray-600 hover:text-green-800">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeletePencapaian(item.id)} className="p-1.5 h-8 text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
