"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Edit, Save, X, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"

interface PrestasiItem {
  id: number
  nama: string
  prestasi: string
  tahun: string
  foto?: string
}

interface FotoItem {
  id: number
  nama: string
  deskripsi: string
  foto: string
}

interface PrestasiProps {
  isAdmin: boolean
}

export function Prestasi({ isAdmin }: PrestasiProps) {
  const [prestasiPutra, setPrestasiPutra] = useState({
    paud: [
      {
        id: 1,
        nama: "Ahmad Fauzi",
        prestasi: "Juara 1 Lomba Hafalan Surat Pendek",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 2,
        nama: "Muhammad Rizki",
        prestasi: "Juara 2 Lomba Mewarnai Islami",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
    ],
    sd: [
      {
        id: 3,
        nama: "Abdullah Rahman",
        prestasi: "Juara 1 Olimpiade Matematika Tingkat Kabupaten",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 4,
        nama: "Umar Faruq",
        prestasi: "Juara 3 Lomba Pidato Bahasa Arab",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
    ],
    mts: [
      {
        id: 5,
        nama: "Ali Akbar",
        prestasi: "Juara 1 Lomba Tahfidz Al-Qur'an Tingkat Provinsi",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 6,
        nama: "Hasan Basri",
        prestasi: "Juara 2 Olimpiade Fisika Tingkat Nasional",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
    ],
    ma: [
      {
        id: 7,
        nama: "Ibrahim Khalil",
        prestasi: "Juara 1 Lomba Karya Tulis Ilmiah Islami",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 8,
        nama: "Yusuf Mansur",
        prestasi: "Juara 3 Debat Bahasa Inggris Tingkat Nasional",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
    ],
    smk: [
      {
        id: 9,
        nama: "Ridwan Kamil",
        prestasi: "Juara 1 Lomba Desain Grafis Tingkat Provinsi",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 10,
        nama: "Fahmi Idris",
        prestasi: "Juara 2 Lomba Programming Tingkat Nasional",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
    ],
  })

  const [prestasiPutri, setPrestasiPutri] = useState({
    paud: [
      {
        id: 11,
        nama: "Aisyah Nur",
        prestasi: "Juara 1 Lomba Adzan Putri",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 12,
        nama: "Fatimah Zahra",
        prestasi: "Juara 2 Lomba Kaligrafi",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
    ],
    sd: [
      {
        id: 13,
        nama: "Khadijah Ummul",
        prestasi: "Juara 1 Olimpiade IPA Tingkat Kabupaten",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 14,
        nama: "Maryam Siddiq",
        prestasi: "Juara 3 Lomba Baca Puisi Islami",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
    ],
    mts: [
      {
        id: 15,
        nama: "Zainab Kubra",
        prestasi: "Juara 1 Lomba Tahfidz Al-Qur'an Putri Tingkat Provinsi",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 16,
        nama: "Ruqayyah Binti",
        prestasi: "Juara 2 Olimpiade Biologi Tingkat Nasional",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
    ],
    ma: [
      {
        id: 17,
        nama: "Ummu Salamah",
        prestasi: "Juara 1 Lomba Esai Islami Tingkat Nasional",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 18,
        nama: "Hafsah Umar",
        prestasi: "Juara 3 Lomba Presentasi Bahasa Arab",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
    ],
    smk: [
      {
        id: 19,
        nama: "Safiyyah Ahmad",
        prestasi: "Juara 1 Lomba Tata Busana Islami",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 20,
        nama: "Ummu Kultsum",
        prestasi: "Juara 2 Lomba Akuntansi Tingkat Provinsi",
        tahun: "2024",
        foto: "/placeholder.svg?height=100&width=100",
      },
    ],
  })

  const [dokumentasiFoto, setDokumentasiFoto] = useState<FotoItem[]>([
    {
      id: 1,
      nama: "Kegiatan Tahfidz",
      deskripsi: "Santri sedang mengikuti kegiatan tahfidz Al-Qur'an",
      foto: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      nama: "Lomba Sains",
      deskripsi: "Santri mengikuti olimpiade sains tingkat provinsi",
      foto: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      nama: "Wisuda Santri",
      deskripsi: "Acara wisuda santri yang telah menyelesaikan program",
      foto: "/placeholder.svg?height=300&width=400",
    },
  ])

  const [editingItem, setEditingItem] = useState<PrestasiItem | null>(null)
  const [editingGender, setEditingGender] = useState<"putra" | "putri" | null>(null)
  const [editingLevel, setEditingLevel] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState<Omit<PrestasiItem, "id">>({
    nama: "",
    prestasi: "",
    tahun: "",
    foto: "/placeholder.svg?height=100&width=100",
  })
  const [newGender, setNewGender] = useState<"putra" | "putri">("putra")
  const [newLevel, setNewLevel] = useState<string>("paud")
  const [uploadingImage, setUploadingImage] = useState<number | null>(null)

  const [editingFoto, setEditingFoto] = useState<FotoItem | null>(null)
  const [showAddFotoForm, setShowAddFotoForm] = useState(false)
  const [newFoto, setNewFoto] = useState<Omit<FotoItem, "id">>({
    nama: "",
    deskripsi: "",
    foto: "/placeholder.svg?height=300&width=400",
  })

  const handleEdit = (item: PrestasiItem, gender: "putra" | "putri", level: string) => {
    setEditingItem({ ...item })
    setEditingGender(gender)
    setEditingLevel(level)
  }

  const handleSave = () => {
    if (editingItem && editingGender && editingLevel) {
      if (editingGender === "putra") {
        setPrestasiPutra((prev) => ({
          ...prev,
          [editingLevel]: prev[editingLevel as keyof typeof prev].map((item) =>
            item.id === editingItem.id ? editingItem : item,
          ),
        }))
      } else {
        setPrestasiPutri((prev) => ({
          ...prev,
          [editingLevel]: prev[editingLevel as keyof typeof prev].map((item) =>
            item.id === editingItem.id ? editingItem : item,
          ),
        }))
      }
      setEditingItem(null)
      setEditingGender(null)
      setEditingLevel(null)
    }
  }

  const handleDelete = (id: number, gender: "putra" | "putri", level: string) => {
    if (gender === "putra") {
      setPrestasiPutra((prev) => ({
        ...prev,
        [level]: prev[level as keyof typeof prev].filter((item) => item.id !== id),
      }))
    } else {
      setPrestasiPutri((prev) => ({
        ...prev,
        [level]: prev[level as keyof typeof prev].filter((item) => item.id !== id),
      }))
    }
  }

  const handleAdd = () => {
    if (newItem.nama && newItem.prestasi && newItem.tahun) {
      const itemWithId = { ...newItem, id: Date.now() }
      if (newGender === "putra") {
        setPrestasiPutra((prev) => ({
          ...prev,
          [newLevel]: [...prev[newLevel as keyof typeof prev], itemWithId],
        }))
      } else {
        setPrestasiPutri((prev) => ({
          ...prev,
          [newLevel]: [...prev[newLevel as keyof typeof prev], itemWithId],
        }))
      }
      setNewItem({
        nama: "",
        prestasi: "",
        tahun: "",
        foto: "/placeholder.svg?height=100&width=100",
      })
      setShowAddForm(false)
    }
  }

  const handleImageUpload = (file: File, itemId: number, gender: "putra" | "putri", level: string) => {
    if (file && file.type.startsWith("image/")) {
      setUploadingImage(itemId)
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        if (gender === "putra") {
          setPrestasiPutra((prev) => ({
            ...prev,
            [level]: prev[level as keyof typeof prev].map((item) =>
              item.id === itemId ? { ...item, foto: imageUrl } : item,
            ),
          }))
        } else {
          setPrestasiPutri((prev) => ({
            ...prev,
            [level]: prev[level as keyof typeof prev].map((item) =>
              item.id === itemId ? { ...item, foto: imageUrl } : item,
            ),
          }))
        }
        setUploadingImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEditFoto = (foto: FotoItem) => {
    setEditingFoto({ ...foto })
  }

  const handleSaveFoto = () => {
    if (editingFoto) {
      setDokumentasiFoto((prev) => prev.map((item) => (item.id === editingFoto.id ? editingFoto : item)))
      setEditingFoto(null)
    }
  }

  const handleDeleteFoto = (id: number) => {
    setDokumentasiFoto((prev) => prev.filter((item) => item.id !== id))
  }

  const handleAddFoto = () => {
    if (newFoto.nama && newFoto.deskripsi && dokumentasiFoto.length < 5) {
      const fotoWithId = { ...newFoto, id: Date.now() }
      setDokumentasiFoto((prev) => [...prev, fotoWithId])
      setNewFoto({
        nama: "",
        deskripsi: "",
        foto: "/placeholder.svg?height=300&width=400",
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

  const renderPrestasi = (data: any, gender: "putra" | "putri") => {
    return (
      <div className="space-y-4 sm:space-y-6">
        {Object.entries(data).map(([tingkat, prestasi]: [string, any]) => (
          <Card key={tingkat} className="border-green-200">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="text-green-800 flex items-center gap-2 text-lg sm:text-xl">
                  <Trophy className="w-5 h-5 flex-shrink-0" />
                  {tingkat.toUpperCase()}
                </CardTitle>
                {isAdmin && (
                  <Button
                    onClick={() => {
                      setNewGender(gender)
                      setNewLevel(tingkat)
                      setShowAddForm(true)
                    }}
                    size="sm"
                    className="bg-green-700 hover:bg-green-800 w-full sm:w-auto"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:gap-4">
                {prestasi.map((item: PrestasiItem) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-green-50 rounded-lg gap-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <div className="relative flex-shrink-0">
                        <img
                          src={item.foto || "/placeholder.svg"}
                          alt={item.nama}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                        />
                        {isAdmin && (
                          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleImageUpload(file, item.id, gender, tingkat)
                              }}
                              className="hidden"
                              id={`upload-prestasi-${item.id}`}
                            />
                            <label
                              htmlFor={`upload-prestasi-${item.id}`}
                              className="text-white text-xs cursor-pointer touch-manipulation"
                            >
                              📷
                            </label>
                          </div>
                        )}
                        {uploadingImage === item.id && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
                            <span className="text-white text-xs">...</span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        {editingItem?.id === item.id ? (
                          <div className="space-y-2">
                            <Input
                              value={editingItem.nama}
                              onChange={(e) => setEditingItem({ ...editingItem, nama: e.target.value })}
                              placeholder="Nama"
                              className="text-sm sm:text-base"
                            />
                            <Input
                              value={editingItem.prestasi}
                              onChange={(e) => setEditingItem({ ...editingItem, prestasi: e.target.value })}
                              placeholder="Prestasi"
                              className="text-sm sm:text-base"
                            />
                            <Input
                              value={editingItem.tahun}
                              onChange={(e) => setEditingItem({ ...editingItem, tahun: e.target.value })}
                              placeholder="Tahun"
                              className="text-sm sm:text-base"
                            />
                          </div>
                        ) : (
                          <>
                            <h4 className="font-semibold text-green-800 text-sm sm:text-base">{item.nama}</h4>
                            <p className="text-gray-700 text-sm leading-relaxed">{item.prestasi}</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {editingItem?.id === item.id ? (
                        <>
                          <Button
                            size="sm"
                            onClick={handleSave}
                            className="bg-green-700 hover:bg-green-800 flex-1 sm:flex-none"
                          >
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingItem(null)}
                            className="flex-1 sm:flex-none"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs sm:text-sm">
                            {item.tahun}
                          </Badge>
                          {isAdmin && (
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" onClick={() => handleEdit(item, gender, tingkat)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(item.id, gender, tingkat)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-green-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-4">Prestasi Santri</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Berbagai prestasi membanggakan yang telah diraih oleh santri-santri Pondok Pesantren DARUL HIKAM di berbagai
            bidang dan tingkat pendidikan.
          </p>
        </div>

        {/* Dokumentasi Foto */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-800">Dokumentasi Foto</h2>
            {isAdmin && (
              <Button
                onClick={() => setShowAddFotoForm(!showAddFotoForm)}
                disabled={dokumentasiFoto.length >= 5}
                className="bg-green-700 hover:bg-green-800 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Foto ({dokumentasiFoto.length}/5)
              </Button>
            )}
          </div>

          {/* Add Foto Form */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {dokumentasiFoto.map((foto) => (
              <Card key={foto.id} className="border-green-200 hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={foto.foto || "/placeholder.svg"}
                    alt={foto.nama}
                    width={400}
                    height={300}
                    className="w-full h-40 sm:h-48 object-cover rounded-t-lg"
                  />
                  {isAdmin && (
                    <>
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditFoto(foto)}
                          className="bg-white/80 hover:bg-white p-2"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteFoto(foto.id)}
                          className="bg-white/80 hover:bg-white text-red-600 hover:text-red-700 p-2"
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
                            if (file) handleFotoUpload(file, foto.id)
                          }}
                          className="hidden"
                          id={`upload-foto-${foto.id}`}
                        />
                        <label
                          htmlFor={`upload-foto-${foto.id}`}
                          className="bg-white/90 hover:bg-white text-green-800 px-2 py-1 rounded text-xs cursor-pointer flex items-center gap-1 touch-manipulation"
                        >
                          📷 Ganti Foto
                        </label>
                      </div>
                    </>
                  )}
                  {uploadingImage === foto.id && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                      <span className="text-white text-sm">Uploading...</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-3 sm:p-4">
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
                      <Input
                        value={editingFoto.foto}
                        onChange={(e) => setEditingFoto({ ...editingFoto, foto: e.target.value })}
                        placeholder="URL Foto"
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
                      <h3 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">{foto.nama}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{foto.deskripsi}</p>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add Form */}
        {showAddForm && isAdmin && (
          <Card className="mb-6 sm:mb-8 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 text-lg sm:text-xl">Tambah Prestasi Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select value={newGender} onValueChange={(value: "putra" | "putri") => setNewGender(value)}>
                  <SelectTrigger className="text-base">
                    <SelectValue placeholder="Pilih Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="putra">Santri Putra</SelectItem>
                    <SelectItem value="putri">Santri Putri</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={newLevel} onValueChange={setNewLevel}>
                  <SelectTrigger className="text-base">
                    <SelectValue placeholder="Pilih Tingkat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paud">PAUD</SelectItem>
                    <SelectItem value="sd">SD/IT</SelectItem>
                    <SelectItem value="mts">MTs</SelectItem>
                    <SelectItem value="ma">MA</SelectItem>
                    <SelectItem value="smk">SMK</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Nama Santri"
                  value={newItem.nama}
                  onChange={(e) => setNewItem({ ...newItem, nama: e.target.value })}
                  className="text-base"
                />
                <Input
                  placeholder="Tahun"
                  value={newItem.tahun}
                  onChange={(e) => setNewItem({ ...newItem, tahun: e.target.value })}
                  className="text-base"
                />
                <div className="sm:col-span-2">
                  <Input
                    placeholder="Prestasi"
                    value={newItem.prestasi}
                    onChange={(e) => setNewItem({ ...newItem, prestasi: e.target.value })}
                    className="text-base"
                  />
                </div>
                <Input
                  placeholder="URL Foto"
                  value={newItem.foto}
                  onChange={(e) => setNewItem({ ...newItem, foto: e.target.value })}
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
                          setNewItem({ ...newItem, foto: e.target?.result as string })
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                    className="text-sm flex-1"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:col-span-2">
                  <Button onClick={handleAdd} className="bg-green-700 hover:bg-green-800 flex-1 sm:flex-none">
                    <Save className="w-4 h-4 mr-2" />
                    Simpan
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1 sm:flex-none">
                    <X className="w-4 h-4 mr-2" />
                    Batal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="putra" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8 h-auto">
            <TabsTrigger value="putra" className="text-base sm:text-lg py-3">
              Santri Putra
            </TabsTrigger>
            <TabsTrigger value="putri" className="text-base sm:text-lg py-3">
              Santri Putri
            </TabsTrigger>
          </TabsList>

          <TabsContent value="putra">{renderPrestasi(prestasiPutra, "putra")}</TabsContent>
          <TabsContent value="putri">{renderPrestasi(prestasiPutri, "putri")}</TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
