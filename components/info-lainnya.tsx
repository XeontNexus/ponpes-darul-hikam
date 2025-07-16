"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Save, X, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

interface InfoLainnyaProps {
  isAdmin: boolean
}

interface BiayaItem {
  id: number
  nama: string
  harga: number
}

interface BiayaProgram {
  uangPangkal: BiayaItem[]
  bulanan: BiayaItem[]
}

interface KontakPerson {
  id: number
  nama: string
  hp: string
}

interface FasilitasItem {
  id: number
  nama: string
  deskripsi: string
  foto: string
}

export function InfoLainnya({ isAdmin }: InfoLainnyaProps) {
  const [biayaPendidikan, setBiayaPendidikan] = useState({
    mts: {
      uangPangkal: [
        { id: 1, nama: "Pendaftaran", harga: 100000 },
        { id: 2, nama: "Dana Pembangunan", harga: 700000 },
        { id: 3, nama: "Baju Seragam", harga: 200000 },
        { id: 4, nama: "Buku dan Alat Tulis", harga: 70000 },
        { id: 5, nama: "Uang Sekolah Bulanan", harga: 200000 },
        { id: 6, nama: "Uang Kegiatan", harga: 50000 },
        { id: 7, nama: "Uang Infaq", harga: 50000 },
      ],
      bulanan: [
        { id: 8, nama: "Bulanan (Putra/Putri)", harga: 200000 },
        { id: 9, nama: "SPP", harga: 150000 },
      ],
    },
    ma: {
      uangPangkal: [
        { id: 10, nama: "Pendaftaran", harga: 100000 },
        { id: 11, nama: "Dana Pembangunan", harga: 800000 },
        { id: 12, nama: "Baju Seragam", harga: 200000 },
        { id: 13, nama: "Buku dan Alat Tulis", harga: 70000 },
        { id: 14, nama: "Uang Sekolah Bulanan", harga: 250000 },
        { id: 15, nama: "Uang Kegiatan", harga: 50000 },
        { id: 16, nama: "Uang Infaq", harga: 50000 },
      ],
      bulanan: [
        { id: 17, nama: "Bulanan (Putra/Putri)", harga: 250000 },
        { id: 18, nama: "SPP", harga: 200000 },
      ],
    },
    smk: {
      uangPangkal: [
        { id: 19, nama: "Pendaftaran", harga: 100000 },
        { id: 20, nama: "Dana Pembangunan", harga: 700000 },
        { id: 21, nama: "Baju Seragam", harga: 250000 },
        { id: 22, nama: "Buku dan Alat Tulis", harga: 100000 },
        { id: 23, nama: "Uang Sekolah Bulanan", harga: 250000 },
        { id: 24, nama: "Uang Kegiatan", harga: 50000 },
        { id: 25, nama: "Uang Infaq", harga: 50000 },
      ],
      bulanan: [
        { id: 26, nama: "Bulanan (Putra/Putri)", harga: 250000 },
        { id: 27, nama: "SPP", harga: 200000 },
      ],
    },
  })

  const [kontakPerson, setKontakPerson] = useState<KontakPerson[]>([
    { id: 1, nama: "Ust. Akhmad Kharis, ST", hp: "0812 7162 9771" },
    { id: 2, nama: "Ustdz. Layin Natusifah, Lc", hp: "0822 6898 1370" },
    { id: 3, nama: "Bayu M. Fajri, S.Sos", hp: "0822 8050 0580" },
    { id: 4, nama: "Indri Wahyu Ningsih, S.Pd", hp: "0822 8963 0416" },
  ])

  const [fasilitas, setFasilitas] = useState<FasilitasItem[]>([
    {
      id: 1,
      nama: "Masjid Utama",
      deskripsi: "Masjid yang luas dan nyaman untuk ibadah dan kegiatan keagamaan",
      foto: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      nama: "Asrama Santri",
      deskripsi: "Asrama yang bersih dan nyaman dengan fasilitas lengkap",
      foto: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      nama: "Perpustakaan",
      deskripsi: "Perpustakaan dengan koleksi buku agama dan umum yang lengkap",
      foto: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      nama: "Laboratorium Komputer",
      deskripsi: "Lab komputer dengan perangkat modern untuk pembelajaran IT",
      foto: "/placeholder.svg?height=300&width=400",
    },
  ])

  const [catatan, setCatatan] = useState([
    "Laundry khusus seragam sekolah, biaya Rp 60.000/bulan, jika menggunakan laundry full dikenakan biaya Rp 120.000/bulan.",
    "Pembayaran di atas wajib 3.000.000 untuk pendaftaran, kekurangan waktu selambat-lambatnya 3 bulan setelah masuk pondok.",
  ])

  const [editingBiaya, setEditingBiaya] = useState<{ program: string; kategori: string; item: BiayaItem } | null>(null)
  const [editingKontak, setEditingKontak] = useState<KontakPerson | null>(null)
  const [editingFasilitas, setEditingFasilitas] = useState<FasilitasItem | null>(null)
  const [editingCatatan, setEditingCatatan] = useState<{ index: number; text: string } | null>(null)

  const [showAddForms, setShowAddForms] = useState({
    biaya: false,
    kontak: false,
    fasilitas: false,
    catatan: false,
  })

  const [newItems, setNewItems] = useState({
    biaya: { program: "mts", kategori: "uangPangkal", nama: "", harga: 0 },
    kontak: { nama: "", hp: "" },
    fasilitas: { nama: "", deskripsi: "", foto: "/placeholder.svg?height=300&width=400" },
    catatan: "",
  })

  const [uploadingImage, setUploadingImage] = useState<number | null>(null)

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const calculateTotal = (items: BiayaItem[]) => {
    return items.reduce((total, item) => total + item.harga, 0)
  }

  const handleEditBiaya = (program: string, kategori: string, item: BiayaItem) => {
    setEditingBiaya({ program, kategori, item: { ...item } })
  }

  const handleSaveBiaya = () => {
    if (editingBiaya) {
      setBiayaPendidikan((prev) => ({
        ...prev,
        [editingBiaya.program]: {
          ...prev[editingBiaya.program as keyof typeof prev],
          [editingBiaya.kategori]: prev[editingBiaya.program as keyof typeof prev][
            editingBiaya.kategori as keyof BiayaProgram
          ].map((item) => (item.id === editingBiaya.item.id ? editingBiaya.item : item)),
        },
      }))
      setEditingBiaya(null)
    }
  }

  const handleDeleteBiaya = (program: string, kategori: string, id: number) => {
    setBiayaPendidikan((prev) => ({
      ...prev,
      [program]: {
        ...prev[program as keyof typeof prev],
        [kategori]: prev[program as keyof typeof prev][kategori as keyof BiayaProgram].filter((item) => item.id !== id),
      },
    }))
  }

  const handleAddBiaya = () => {
    if (newItems.biaya.nama && newItems.biaya.harga > 0) {
      const newItem: BiayaItem = {
        id: Date.now(),
        nama: newItems.biaya.nama,
        harga: newItems.biaya.harga,
      }

      setBiayaPendidikan((prev) => ({
        ...prev,
        [newItems.biaya.program]: {
          ...prev[newItems.biaya.program as keyof typeof prev],
          [newItems.biaya.kategori]: [
            ...prev[newItems.biaya.program as keyof typeof prev][newItems.biaya.kategori as keyof BiayaProgram],
            newItem,
          ],
        },
      }))

      setNewItems((prev) => ({
        ...prev,
        biaya: { program: "mts", kategori: "uangPangkal", nama: "", harga: 0 },
      }))
      setShowAddForms((prev) => ({ ...prev, biaya: false }))
    }
  }

  const handleEditKontak = (kontak: KontakPerson) => {
    setEditingKontak({ ...kontak })
  }

  const handleSaveKontak = () => {
    if (editingKontak) {
      setKontakPerson((prev) => prev.map((item) => (item.id === editingKontak.id ? editingKontak : item)))
      setEditingKontak(null)
    }
  }

  const handleDeleteKontak = (id: number) => {
    setKontakPerson((prev) => prev.filter((item) => item.id !== id))
  }

  const handleAddKontak = () => {
    if (newItems.kontak.nama && newItems.kontak.hp) {
      const newKontak: KontakPerson = {
        id: Date.now(),
        nama: newItems.kontak.nama,
        hp: newItems.kontak.hp,
      }
      setKontakPerson((prev) => [...prev, newKontak])
      setNewItems((prev) => ({ ...prev, kontak: { nama: "", hp: "" } }))
      setShowAddForms((prev) => ({ ...prev, kontak: false }))
    }
  }

  const handleEditFasilitas = (fasilitas: FasilitasItem) => {
    setEditingFasilitas({ ...fasilitas })
  }

  const handleSaveFasilitas = () => {
    if (editingFasilitas) {
      setFasilitas((prev) => prev.map((item) => (item.id === editingFasilitas.id ? editingFasilitas : item)))
      setEditingFasilitas(null)
    }
  }

  const handleDeleteFasilitas = (id: number) => {
    setFasilitas((prev) => prev.filter((item) => item.id !== id))
  }

  const handleAddFasilitas = () => {
    if (newItems.fasilitas.nama && newItems.fasilitas.deskripsi) {
      const newFasilitas: FasilitasItem = {
        id: Date.now(),
        nama: newItems.fasilitas.nama,
        deskripsi: newItems.fasilitas.deskripsi,
        foto: newItems.fasilitas.foto,
      }
      setFasilitas((prev) => [...prev, newFasilitas])
      setNewItems((prev) => ({
        ...prev,
        fasilitas: { nama: "", deskripsi: "", foto: "/placeholder.svg?height=300&width=400" },
      }))
      setShowAddForms((prev) => ({ ...prev, fasilitas: false }))
    }
  }

  const handleEditCatatan = (index: number, text: string) => {
    setEditingCatatan({ index, text })
  }

  const handleSaveCatatan = () => {
    if (editingCatatan !== null) {
      setCatatan((prev) => prev.map((item, index) => (index === editingCatatan.index ? editingCatatan.text : item)))
      setEditingCatatan(null)
    }
  }

  const handleDeleteCatatan = (index: number) => {
    setCatatan((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddCatatan = () => {
    if (newItems.catatan.trim()) {
      setCatatan((prev) => [...prev, newItems.catatan])
      setNewItems((prev) => ({ ...prev, catatan: "" }))
      setShowAddForms((prev) => ({ ...prev, catatan: false }))
    }
  }

  const handleImageUpload = (file: File, itemId: number) => {
    if (file && file.type.startsWith("image/")) {
      setUploadingImage(itemId)
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setFasilitas((prev) => prev.map((item) => (item.id === itemId ? { ...item, foto: imageUrl } : item)))
        setUploadingImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Info Lainnya</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Informasi lengkap mengenai pendaftaran, biaya pendidikan, fasilitas, dan kontak person untuk Penerimaan
            Santri Baru Tahun Ajaran 2025/2026.
          </p>
        </div>

        {/* Info Pendaftaran */}
        <Card className="mb-8 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 text-center">Penerimaan Santri Baru Tahun Ajaran 2025/2026</CardTitle>
            <div className="text-center">
              <Badge className="bg-green-700 text-white text-lg px-4 py-2">Yayasan Pondok Pesantren Darul Hikam</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Info Pendaftaran"
                width={600}
                height={400}
                className="mx-auto rounded-lg shadow-md mb-6"
              />
              {isAdmin && (
                <Button className="bg-green-700 hover:bg-green-800">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Poster
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Fasilitas */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-green-800">Fasilitas Pondok</h2>
            {isAdmin && (
              <Button
                onClick={() => setShowAddForms((prev) => ({ ...prev, fasilitas: !prev.fasilitas }))}
                className="bg-green-700 hover:bg-green-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Fasilitas
              </Button>
            )}
          </div>

          {/* Add Fasilitas Form */}
          {showAddForms.fasilitas && isAdmin && (
            <Card className="mb-6 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Tambah Fasilitas Baru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nama Fasilitas"
                    value={newItems.fasilitas.nama}
                    onChange={(e) =>
                      setNewItems((prev) => ({
                        ...prev,
                        fasilitas: { ...prev.fasilitas, nama: e.target.value },
                      }))
                    }
                  />
                  <Input
                    placeholder="URL Foto"
                    value={newItems.fasilitas.foto}
                    onChange={(e) =>
                      setNewItems((prev) => ({
                        ...prev,
                        fasilitas: { ...prev.fasilitas, foto: e.target.value },
                      }))
                    }
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
                            setNewItems((prev) => ({
                              ...prev,
                              fasilitas: { ...prev.fasilitas, foto: e.target?.result as string },
                            }))
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                      className="text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Textarea
                      placeholder="Deskripsi Fasilitas"
                      value={newItems.fasilitas.deskripsi}
                      onChange={(e) =>
                        setNewItems((prev) => ({
                          ...prev,
                          fasilitas: { ...prev.fasilitas, deskripsi: e.target.value },
                        }))
                      }
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2 flex gap-2">
                    <Button onClick={handleAddFasilitas} className="bg-green-700 hover:bg-green-800">
                      <Save className="w-4 h-4 mr-2" />
                      Simpan
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowAddForms((prev) => ({ ...prev, fasilitas: false }))}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Batal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {fasilitas.map((item) => (
              <Card key={item.id} className="border-green-200 hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={item.foto || "/placeholder.svg"}
                    alt={item.nama}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {isAdmin && (
                    <>
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditFasilitas(item)}
                          className="bg-white/80 hover:bg-white"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteFasilitas(item.id)}
                          className="bg-white/80 hover:bg-white text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleImageUpload(file, item.id)
                          }}
                          className="hidden"
                          id={`upload-fasilitas-${item.id}`}
                        />
                        <label
                          htmlFor={`upload-fasilitas-${item.id}`}
                          className="bg-white/80 hover:bg-white text-green-800 px-2 py-1 rounded text-xs cursor-pointer flex items-center gap-1"
                        >
                          📷 Ganti Foto
                        </label>
                      </div>
                    </>
                  )}
                  {uploadingImage === item.id && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                      <span className="text-white text-sm">Uploading...</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  {editingFasilitas?.id === item.id ? (
                    <div className="space-y-3">
                      <Input
                        value={editingFasilitas.nama}
                        onChange={(e) => setEditingFasilitas({ ...editingFasilitas, nama: e.target.value })}
                        placeholder="Nama Fasilitas"
                      />
                      <Textarea
                        value={editingFasilitas.deskripsi}
                        onChange={(e) => setEditingFasilitas({ ...editingFasilitas, deskripsi: e.target.value })}
                        placeholder="Deskripsi"
                        rows={3}
                      />
                      <Input
                        value={editingFasilitas.foto}
                        onChange={(e) => setEditingFasilitas({ ...editingFasilitas, foto: e.target.value })}
                        placeholder="URL Foto"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSaveFasilitas} className="bg-green-700 hover:bg-green-800">
                          <Save className="w-3 h-3 mr-1" />
                          Simpan
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingFasilitas(null)}>
                          <X className="w-3 h-3 mr-1" />
                          Batal
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-semibold text-green-800 mb-2">{item.nama}</h3>
                      <p className="text-gray-600 text-sm">{item.deskripsi}</p>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Biaya Pendidikan */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-green-800">Biaya Pendidikan</h2>
            {isAdmin && (
              <Button
                onClick={() => setShowAddForms((prev) => ({ ...prev, biaya: !prev.biaya }))}
                className="bg-green-700 hover:bg-green-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Item Biaya
              </Button>
            )}
          </div>

          {/* Add Biaya Form */}
          {showAddForms.biaya && isAdmin && (
            <Card className="mb-6 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Tambah Item Biaya Baru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <select
                    value={newItems.biaya.program}
                    onChange={(e) =>
                      setNewItems((prev) => ({
                        ...prev,
                        biaya: { ...prev.biaya, program: e.target.value },
                      }))
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="mts">MTs</option>
                    <option value="ma">MA</option>
                    <option value="smk">SMK</option>
                  </select>
                  <select
                    value={newItems.biaya.kategori}
                    onChange={(e) =>
                      setNewItems((prev) => ({
                        ...prev,
                        biaya: { ...prev.biaya, kategori: e.target.value },
                      }))
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="uangPangkal">Uang Pangkal</option>
                    <option value="bulanan">Bulanan</option>
                  </select>
                  <Input
                    placeholder="Nama Item"
                    value={newItems.biaya.nama}
                    onChange={(e) =>
                      setNewItems((prev) => ({
                        ...prev,
                        biaya: { ...prev.biaya, nama: e.target.value },
                      }))
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Harga"
                    value={newItems.biaya.harga || ""}
                    onChange={(e) =>
                      setNewItems((prev) => ({
                        ...prev,
                        biaya: { ...prev.biaya, harga: Number.parseInt(e.target.value) || 0 },
                      }))
                    }
                  />
                  <div className="md:col-span-4 flex gap-2">
                    <Button onClick={handleAddBiaya} className="bg-green-700 hover:bg-green-800">
                      <Save className="w-4 h-4 mr-2" />
                      Simpan
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddForms((prev) => ({ ...prev, biaya: false }))}>
                      <X className="w-4 h-4 mr-2" />
                      Batal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {Object.entries(biayaPendidikan).map(([program, data]) => (
              <Card key={program} className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 text-center">
                    {program === "mts"
                      ? "Madrasah Tsanawiyah (MTs)"
                      : program === "ma"
                        ? "Madrasah Aliyah (MA)"
                        : "SMK Darul Hikam"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Uang Pangkal:</h4>
                      <ul className="space-y-1 text-sm">
                        {data.uangPangkal.map((item) => (
                          <li key={item.id} className="flex justify-between items-center">
                            {editingBiaya?.item.id === item.id ? (
                              <div className="flex gap-2 w-full">
                                <Input
                                  value={editingBiaya.item.nama}
                                  onChange={(e) =>
                                    setEditingBiaya({
                                      ...editingBiaya,
                                      item: { ...editingBiaya.item, nama: e.target.value },
                                    })
                                  }
                                  className="flex-1"
                                />
                                <Input
                                  type="number"
                                  value={editingBiaya.item.harga}
                                  onChange={(e) =>
                                    setEditingBiaya({
                                      ...editingBiaya,
                                      item: { ...editingBiaya.item, harga: Number.parseInt(e.target.value) || 0 },
                                    })
                                  }
                                  className="w-32"
                                />
                                <Button size="sm" onClick={handleSaveBiaya} className="bg-green-700 hover:bg-green-800">
                                  <Save className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => setEditingBiaya(null)}>
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ) : (
                              <>
                                <span>{item.nama}:</span>
                                <div className="flex items-center gap-2">
                                  <span>{formatRupiah(item.harga)}</span>
                                  {isAdmin && (
                                    <div className="flex gap-1">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleEditBiaya(program, "uangPangkal", item)}
                                      >
                                        <Edit className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleDeleteBiaya(program, "uangPangkal", item.id)}
                                        className="text-red-600 hover:text-red-700"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </li>
                        ))}
                        <li className="flex justify-between font-bold border-t pt-1">
                          <span>Total:</span>
                          <span>{formatRupiah(calculateTotal(data.uangPangkal))}</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Bulanan:</h4>
                      <ul className="space-y-1 text-sm">
                        {data.bulanan.map((item) => (
                          <li key={item.id} className="flex justify-between items-center">
                            {editingBiaya?.item.id === item.id ? (
                              <div className="flex gap-2 w-full">
                                <Input
                                  value={editingBiaya.item.nama}
                                  onChange={(e) =>
                                    setEditingBiaya({
                                      ...editingBiaya,
                                      item: { ...editingBiaya.item, nama: e.target.value },
                                    })
                                  }
                                  className="flex-1"
                                />
                                <Input
                                  type="number"
                                  value={editingBiaya.item.harga}
                                  onChange={(e) =>
                                    setEditingBiaya({
                                      ...editingBiaya,
                                      item: { ...editingBiaya.item, harga: Number.parseInt(e.target.value) || 0 },
                                    })
                                  }
                                  className="w-32"
                                />
                                <Button size="sm" onClick={handleSaveBiaya} className="bg-green-700 hover:bg-green-800">
                                  <Save className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => setEditingBiaya(null)}>
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ) : (
                              <>
                                <span>{item.nama}:</span>
                                <div className="flex items-center gap-2">
                                  <span>{formatRupiah(item.harga)}</span>
                                  {isAdmin && (
                                    <div className="flex gap-1">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleEditBiaya(program, "bulanan", item)}
                                      >
                                        <Edit className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleDeleteBiaya(program, "bulanan", item.id)}
                                        className="text-red-600 hover:text-red-700"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </li>
                        ))}
                        <li className="flex justify-between font-bold border-t pt-1">
                          <span>Total:</span>
                          <span>{formatRupiah(calculateTotal(data.bulanan))}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Kontak Person */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-green-800">Kontak Person</h2>
            {isAdmin && (
              <Button
                onClick={() => setShowAddForms((prev) => ({ ...prev, kontak: !prev.kontak }))}
                className="bg-green-700 hover:bg-green-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Kontak
              </Button>
            )}
          </div>

          {/* Add Kontak Form */}
          {showAddForms.kontak && isAdmin && (
            <Card className="mb-6 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Tambah Kontak Person Baru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nama"
                    value={newItems.kontak.nama}
                    onChange={(e) =>
                      setNewItems((prev) => ({
                        ...prev,
                        kontak: { ...prev.kontak, nama: e.target.value },
                      }))
                    }
                  />
                  <Input
                    placeholder="Nomor HP"
                    value={newItems.kontak.hp}
                    onChange={(e) =>
                      setNewItems((prev) => ({
                        ...prev,
                        kontak: { ...prev.kontak, hp: e.target.value },
                      }))
                    }
                  />
                  <div className="md:col-span-2 flex gap-2">
                    <Button onClick={handleAddKontak} className="bg-green-700 hover:bg-green-800">
                      <Save className="w-4 h-4 mr-2" />
                      Simpan
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddForms((prev) => ({ ...prev, kontak: false }))}>
                      <X className="w-4 h-4 mr-2" />
                      Batal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {kontakPerson.map((kontak) => (
              <Card key={kontak.id} className="border-green-200">
                <CardContent className="p-6">
                  {editingKontak?.id === kontak.id ? (
                    <div className="space-y-3">
                      <Input
                        value={editingKontak.nama}
                        onChange={(e) => setEditingKontak({ ...editingKontak, nama: e.target.value })}
                        placeholder="Nama"
                      />
                      <Input
                        value={editingKontak.hp}
                        onChange={(e) => setEditingKontak({ ...editingKontak, hp: e.target.value })}
                        placeholder="Nomor HP"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSaveKontak} className="bg-green-700 hover:bg-green-800">
                          <Save className="w-3 h-3 mr-1" />
                          Simpan
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingKontak(null)}>
                          <X className="w-3 h-3 mr-1" />
                          Batal
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-green-800">{kontak.nama}</h3>
                        <p className="text-gray-600">{kontak.hp}</p>
                      </div>
                      {isAdmin && (
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => handleEditKontak(kontak)}>
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteKontak(kontak.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Catatan */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-green-800">Catatan Penting</h2>
            {isAdmin && (
              <Button
                onClick={() => setShowAddForms((prev) => ({ ...prev, catatan: !prev.catatan }))}
                className="bg-green-700 hover:bg-green-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Catatan
              </Button>
            )}
          </div>

          {/* Add Catatan Form */}
          {showAddForms.catatan && isAdmin && (
            <Card className="mb-6 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Tambah Catatan Baru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Tulis catatan penting..."
                    value={newItems.catatan}
                    onChange={(e) => setNewItems((prev) => ({ ...prev, catatan: e.target.value }))}
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleAddCatatan} className="bg-green-700 hover:bg-green-800">
                      <Save className="w-4 h-4 mr-2" />
                      Simpan
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddForms((prev) => ({ ...prev, catatan: false }))}>
                      <X className="w-4 h-4 mr-2" />
                      Batal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Catatan Pembayaran</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {catatan.map((item, index) => (
                  <li key={index} className="flex items-start justify-between p-3 bg-yellow-50 rounded-lg">
                    {editingCatatan?.index === index ? (
                      <div className="flex gap-2 w-full">
                        <Textarea
                          value={editingCatatan.text}
                          onChange={(e) => setEditingCatatan({ ...editingCatatan, text: e.target.value })}
                          className="flex-1"
                          rows={2}
                        />
                        <div className="flex flex-col gap-1">
                          <Button size="sm" onClick={handleSaveCatatan} className="bg-green-700 hover:bg-green-800">
                            <Save className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingCatatan(null)}>
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="text-gray-700 flex-1">{item}</span>
                        {isAdmin && (
                          <div className="flex gap-1 ml-4">
                            <Button size="sm" variant="outline" onClick={() => handleEditCatatan(index, item)}>
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteCatatan(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
