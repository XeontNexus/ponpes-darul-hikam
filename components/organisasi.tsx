"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Crown, BookOpen, Calendar, Edit, Save, X, Plus, Trash2, User } from "lucide-react"
import Image from "next/image"

interface GuruItem {
  id: number
  nama: string
  jabatan: string
  unitMengajar: string // e.g. MTs, MA, SMK, Madrasah Diniyah
  tahunMengajar: string // e.g. Sejak 2015
  foto: string
  deskripsi?: string
}

interface OrganisasiProps {
  isAdmin?: boolean
}

export function Organisasi({ isAdmin = false }: OrganisasiProps) {
  // Banner Data Pengasuh Ponpes
  const [pengasuh, setPengasuh] = useState({
    nama: "KH. Ahmad Dahlan",
    jabatan: "Pengasuh & Pimpinan Utama Pondok Pesantren",
    periode: "Mengasuh Sejak 1994",
    biografi:
      "Pendiri dan Pengasuh Pondok Pesantren DARUL HIKAM. Berkomitmen dalam membimbing para santri menuju keunggulan ilmu syariat, hafalan Al-Qur'an, wawasan sains, dan berakhlakul karimah.",
    foto: "/images/banner3.png",
  })

  const [editingPengasuh, setEditingPengasuh] = useState(false)
  const [tempPengasuh, setTempPengasuh] = useState({ ...pengasuh })

  // Data Guru / Ustadz / Ustadzah (Chart Kartu Kecil)
  const [daftarGuru, setDaftarGuru] = useState<GuruItem[]>([
    {
      id: 1,
      nama: "Ust. Muhammad Yusuf, M.Pd.I",
      jabatan: "Pengajar Fiqh & Direktur Kurikulum",
      unitMengajar: "MA Darul Hikam",
      tahunMengajar: "Sejak Tahun 2008",
      foto: "/images/banner2.png",
      deskripsi: "Mengampu mata pelajaran Fiqh Ushul & Tafsir Ahkam.",
    },
    {
      id: 2,
      nama: "Ustdzah Fatimah Azzahra, S.Pd.I",
      jabatan: "Pengajar Tahfidz & Akhlak",
      unitMengajar: "Madrasah Diniyah",
      tahunMengajar: "Sejak Tahun 2012",
      foto: "/images/sejarah3.png",
      deskripsi: "Membimbing kelompok hafalan santri putri.",
    },
    {
      id: 3,
      nama: "Ust. Ahmad Fauzi, Lc",
      jabatan: "Pengajar Bahasa Arab & Hadits",
      unitMengajar: "MTs Darul Hikam",
      tahunMengajar: "Sejak Tahun 2015",
      foto: "/images/banner4.png",
      deskripsi: "Mengajar tata bahasa Nahwu Shorof dan Hadits Tematik.",
    },
    {
      id: 4,
      nama: "Ust. Abdullah Rahman, S.Ag",
      jabatan: "Pengajar Tajwid & Qira'ah",
      unitMengajar: "Madrasah Diniyah",
      tahunMengajar: "Sejak Tahun 2010",
      foto: "/images/sejarah1.png",
      deskripsi: "Pembina kegiatan Tilawatil Qur'an santri putra.",
    },
    {
      id: 5,
      nama: "Bapak Suryadi, S.Pd",
      jabatan: "Pengajar Matematika & IPA",
      unitMengajar: "MTs & MA Darul Hikam",
      tahunMengajar: "Sejak Tahun 2016",
      foto: "/images/banner5.png",
      deskripsi: "Mengajar ilmu sains terpadu dan bimbingan olimpiade.",
    },
    {
      id: 6,
      nama: "Ibu Siti Nurhaliza, S.Pd",
      jabatan: "Pengajar Komputer & Rekayasa Perangkat Lunak",
      unitMengajar: "SMK Darul Hikam",
      tahunMengajar: "Sejak Tahun 2018",
      foto: "/images/sejarah4.png",
      deskripsi: "Instruktur laboratorium komputer dan bahasa pemograman.",
    },
  ])

  const [editingGuru, setEditingGuru] = useState<GuruItem | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newGuru, setNewGuru] = useState<Omit<GuruItem, "id">>({
    nama: "",
    jabatan: "",
    unitMengajar: "MTs Darul Hikam",
    tahunMengajar: "Sejak Tahun 2020",
    foto: "/images/banner2.png",
    deskripsi: "",
  })
  const [uploadingImage, setUploadingImage] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/guru")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setDaftarGuru(data) })
      .catch(() => { /* keep fallback teacher cards */ })

    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error && (data.pengasuhNama || data.pengasuhFoto)) {
          setPengasuh({
            nama: data.pengasuhNama || defaultPengasuh.nama,
            jabatan: data.pengasuhJabatan || defaultPengasuh.jabatan,
            periode: data.pengasuhPeriode || defaultPengasuh.periode,
            biografi: data.pengasuhBiografi || defaultPengasuh.biografi,
            foto: data.pengasuhFoto || defaultPengasuh.foto,
          })
        }
      })
      .catch(() => { /* keep fallback profile */ })
  }, [])

  // Save Pengasuh
  const handleSavePengasuh = () => {
    setPengasuh({ ...tempPengasuh })
    setEditingPengasuh(false)
  }

  // Handlers Guru
  const handleEditGuru = (item: GuruItem) => {
    setEditingGuru({ ...item })
  }

  const handleSaveGuru = () => {
    if (editingGuru) {
      setDaftarGuru((prev) => prev.map((item) => (item.id === editingGuru.id ? editingGuru : item)))
      setEditingGuru(null)
    }
  }

  const handleDeleteGuru = (id: number) => {
    setDaftarGuru((prev) => prev.filter((item) => item.id !== id))
  }

  const handleAddGuru = () => {
    if (newGuru.nama && newGuru.jabatan && newGuru.unitMengajar) {
      setDaftarGuru((prev) => [...prev, { ...newGuru, id: Date.now() }])
      setNewGuru({
        nama: "",
        jabatan: "",
        unitMengajar: "MTs Darul Hikam",
        tahunMengajar: "Sejak Tahun 2020",
        foto: "/images/banner2.png",
        deskripsi: "",
      })
      setShowAddForm(false)
    }
  }

  const handleImageUpload = (file: File, itemId: number) => {
    if (file && file.type.startsWith("image/")) {
      setUploadingImage(itemId)
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setDaftarGuru((prev) => prev.map((item) => (item.id === itemId ? { ...item, foto: imageUrl } : item)))
        setUploadingImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-green-50/40 animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-700 ease-out">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-3">
            Pengurus & Pengajar Pesantren
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mengenal Pengasuh serta jajaran Ustadz & Ustadzah pengajar di lingkungan Pondok Pesantren DARUL HIKAM.
          </p>
        </div>

        {/* 1. Banner Full-Width Pengasuh Ponpes */}
        <div className="mb-14 sm:mb-18 max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-r from-green-900 via-green-800 to-green-950 text-white border-4 border-green-700/40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
              {/* Foto Banner Pengasuh */}
              <div className="lg:col-span-5 relative h-[280px] sm:h-[360px] lg:h-[420px] w-full">
                <Image
                  src={pengasuh.foto}
                  alt={pengasuh.nama}
                  fill
                  priority
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-transparent to-transparent lg:hidden" />
              </div>

              {/* Detail Profile Pengasuh */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
                {editingPengasuh ? (
                  <div className="space-y-3 bg-white/10 p-4 rounded-xl backdrop-blur-md">
                    <Input
                      value={tempPengasuh.nama}
                      onChange={(e) => setTempPengasuh({ ...tempPengasuh, nama: e.target.value })}
                      placeholder="Nama Pengasuh"
                      className="bg-white text-gray-900 font-bold"
                    />
                    <Input
                      value={tempPengasuh.jabatan}
                      onChange={(e) => setTempPengasuh({ ...tempPengasuh, jabatan: e.target.value })}
                      placeholder="Jabatan"
                      className="bg-white text-gray-900"
                    />
                    <Input
                      value={tempPengasuh.periode}
                      onChange={(e) => setTempPengasuh({ ...tempPengasuh, periode: e.target.value })}
                      placeholder="Periode Mengasuh"
                      className="bg-white text-gray-900"
                    />
                    <Textarea
                      value={tempPengasuh.biografi}
                      onChange={(e) => setTempPengasuh({ ...tempPengasuh, biografi: e.target.value })}
                      placeholder="Biografi Singkat"
                      rows={3}
                      className="bg-white text-gray-900"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSavePengasuh} className="bg-green-600 hover:bg-green-500">
                        <Save className="w-4 h-4 mr-1" /> Simpan
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingPengasuh(false)} className="text-gray-800 bg-white">
                        <X className="w-4 h-4 mr-1" /> Batal
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-1 tracking-tight">
                      {pengasuh.nama}
                    </h2>
                    <p className="text-amber-300 font-semibold text-xs sm:text-sm tracking-wide uppercase mb-2">
                      PENGASUH UTAMA — {pengasuh.periode}
                    </p>
                    <p className="text-green-200 font-medium text-sm sm:text-base mb-4">
                      {pengasuh.jabatan}
                    </p>
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-6 font-light">
                      "{pengasuh.biografi}"
                    </p>

                    {isAdmin && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setTempPengasuh({ ...pengasuh })
                          setEditingPengasuh(true)
                        }}
                        className="bg-white/20 hover:bg-white/30 text-white w-fit border border-white/30"
                      >
                        <Edit className="w-4 h-4 mr-1.5" /> Edit Banner Pengasuh
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Chart Kartu Kecil Pengurus & Guru / Ustadz & Ustadzah */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-800">
              Daftar Ustadz & Ustadzah Pengajar
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Tenaga pendidik profesional yang mengampu pembelajaran di setiap unit pendidikan
            </p>
            {isAdmin && (
              <div className="mt-3 flex justify-center">
                <Button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-green-700 hover:bg-green-800"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Pengajar
                </Button>
              </div>
            )}
          </div>

          {/* Form Tambah Guru (Admin) */}
          {showAddForm && isAdmin && (
            <Card className="mb-8 border-2 border-green-200 shadow-md">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg font-bold text-green-800 mb-4">Tambah Data Guru / Ustadz</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nama Lengkap & Gelar (cth: Ust. Ahmad, S.Pd)"
                    value={newGuru.nama}
                    onChange={(e) => setNewGuru({ ...newGuru, nama: e.target.value })}
                  />
                  <Input
                    placeholder="Mata Pelajaran / Jabatan (cth: Pengajar Fiqh)"
                    value={newGuru.jabatan}
                    onChange={(e) => setNewGuru({ ...newGuru, jabatan: e.target.value })}
                  />
                  <Input
                    placeholder="Mengajar di Unit Mana (cth: MTs / MA / SMK / Madrasah Diniyah)"
                    value={newGuru.unitMengajar}
                    onChange={(e) => setNewGuru({ ...newGuru, unitMengajar: e.target.value })}
                  />
                  <Input
                    placeholder="Mengajar Dari Tahun Kapan (cth: Sejak Tahun 2015)"
                    value={newGuru.tahunMengajar}
                    onChange={(e) => setNewGuru({ ...newGuru, tahunMengajar: e.target.value })}
                  />
                  <div className="sm:col-span-2">
                    <Input
                      placeholder="URL Foto"
                      value={newGuru.foto}
                      onChange={(e) => setNewGuru({ ...newGuru, foto: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-2">
                    <span className="text-sm text-gray-600">atau upload foto:</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = (e) => {
                            setNewGuru({ ...newGuru, foto: e.target?.result as string })
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                      className="text-sm flex-1"
                    />
                  </div>
                  <div className="sm:col-span-2 flex gap-2 pt-2">
                    <Button onClick={handleAddGuru} className="bg-green-700 hover:bg-green-800">
                      <Save className="w-4 h-4 mr-2" /> Simpan
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      <X className="w-4 h-4 mr-2" /> Batal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Grid Chart Kartu Kecil (Small Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {daftarGuru.map((guru) => (
              <Card
                key={guru.id}
                className="border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all duration-300 bg-white rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <CardContent className="p-5 flex flex-col items-center text-center">
                  {/* Foto Guru */}
                  <div className="relative mb-4">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-green-600/30 shadow-md relative mx-auto">
                      <Image
                        src={guru.foto || "/placeholder.svg"}
                        alt={guru.nama}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {isAdmin && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-full flex items-center justify-center cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleImageUpload(file, guru.id)
                          }}
                          className="hidden"
                          id={`upload-guru-${guru.id}`}
                        />
                        <label htmlFor={`upload-guru-${guru.id}`} className="text-white text-xs cursor-pointer font-medium">
                          📷 Ganti
                        </label>
                      </div>
                    )}
                    {uploadingImage === guru.id && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
                        <span className="text-white text-xs">...</span>
                      </div>
                    )}
                  </div>

                  {editingGuru?.id === guru.id ? (
                    <div className="space-y-2 w-full text-left">
                      <Input
                        value={editingGuru.nama}
                        onChange={(e) => setEditingGuru({ ...editingGuru, nama: e.target.value })}
                        placeholder="Nama Guru"
                        className="text-sm font-semibold"
                      />
                      <Input
                        value={editingGuru.jabatan}
                        onChange={(e) => setEditingGuru({ ...editingGuru, jabatan: e.target.value })}
                        placeholder="Mata Pelajaran"
                        className="text-xs"
                      />
                      <Input
                        value={editingGuru.unitMengajar}
                        onChange={(e) => setEditingGuru({ ...editingGuru, unitMengajar: e.target.value })}
                        placeholder="Unit Mengajar (MTs / MA / SMK)"
                        className="text-xs"
                      />
                      <Input
                        value={editingGuru.tahunMengajar}
                        onChange={(e) => setEditingGuru({ ...editingGuru, tahunMengajar: e.target.value })}
                        placeholder="Tahun Mengajar (cth: Sejak 2015)"
                        className="text-xs"
                      />
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" onClick={handleSaveGuru} className="bg-green-700 hover:bg-green-800 flex-1">
                          <Save className="w-3.5 h-3.5 mr-1" /> Simpan
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingGuru(null)} className="flex-1">
                          <X className="w-3.5 h-3.5 mr-1" /> Batal
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Nama Guru */}
                      <h3 className="font-bold text-green-900 text-base sm:text-lg mb-1 leading-snug">
                        {guru.nama}
                      </h3>

                      {/* Jabatan / Matpel */}
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 font-medium">
                        {guru.jabatan}
                      </p>

                      {/* Badges Info Unit Mengajar & Tahun Mengajar */}
                      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3">
                        <Badge className="bg-green-100 text-green-800 border border-green-200 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-green-700" />
                          {guru.unitMengajar}
                        </Badge>
                        <Badge variant="outline" className="text-gray-700 border-gray-300 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-500" />
                          {guru.tahunMengajar}
                        </Badge>
                      </div>

                      {guru.deskripsi && (
                        <p className="text-xs text-gray-500 leading-relaxed italic border-t border-green-50 pt-2 w-full">
                          "{guru.deskripsi}"
                        </p>
                      )}
                    </>
                  )}
                </CardContent>

                {/* Admin Actions */}
                {isAdmin && !editingGuru && (
                  <div className="px-5 pb-4 flex justify-end gap-1.5 border-t border-green-50 pt-2 bg-green-50/30">
                    <Button size="sm" variant="ghost" onClick={() => handleEditGuru(guru)} className="h-8 px-2 text-gray-600 hover:text-green-800">
                      <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteGuru(guru.id)} className="h-8 px-2 text-red-600 hover:text-red-800">
                      <Trash2 className="w-3.5 h-3.5 mr-1" /> Hapus
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
