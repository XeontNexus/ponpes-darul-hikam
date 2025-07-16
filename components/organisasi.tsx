"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Edit, Save, X, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

interface PersonData {
  id: number
  nama: string
  jabatan: string
  foto: string
  deskripsi: string
  kelas?: string
}

interface OrganisasiProps {
  isAdmin: boolean
}

export function Organisasi({ isAdmin }: OrganisasiProps) {
  const [pengurusPondok, setPengurusPondok] = useState<PersonData[]>([
    {
      id: 1,
      nama: "KH. Ahmad Dahlan",
      jabatan: "Pengasuh/Pimpinan Pondok",
      foto: "/placeholder.svg?height=200&width=200",
      deskripsi: "Pendiri dan pengasuh Pondok Pesantren DARUL HIKAM sejak tahun 1994",
    },
    {
      id: 2,
      nama: "Ust. Muhammad Yusuf, M.Pd.I",
      jabatan: "Direktur Pendidikan",
      foto: "/placeholder.svg?height=200&width=200",
      deskripsi: "Mengelola seluruh program pendidikan di lingkungan pesantren",
    },
    {
      id: 3,
      nama: "Ustdzah Fatimah Azzahra, S.Pd.I",
      jabatan: "Kepala Bagian Santri Putri",
      foto: "/placeholder.svg?height=200&width=200",
      deskripsi: "Mengurus dan membina santri putri di semua tingkat pendidikan",
    },
    {
      id: 4,
      nama: "Ust. Abdullah Rahman, S.Ag",
      jabatan: "Kepala Bagian Santri Putra",
      foto: "/placeholder.svg?height=200&width=200",
      deskripsi: "Mengurus dan membina santri putra di semua tingkat pendidikan",
    },
  ])

  const [guruNgaji, setGuruNgaji] = useState<PersonData[]>([
    {
      id: 5,
      nama: "Ust. Ahmad Fauzi, Lc",
      jabatan: "Guru Tahfidz",
      foto: "/placeholder.svg?height=200&width=200",
      deskripsi: "Mengajar tahfidz Al-Qur'an dan ilmu tajwid",
    },
    {
      id: 6,
      nama: "Ustdzah Khadijah, S.Pd.I",
      jabatan: "Guru Fiqh",
      foto: "/placeholder.svg?height=200&width=200",
      deskripsi: "Mengajar fiqh dan ushul fiqh",
    },
  ])

  const [guruKelas, setGuruKelas] = useState<PersonData[]>([
    {
      id: 7,
      nama: "Bapak Suryadi, S.Pd",
      jabatan: "Guru Matematika",
      foto: "/placeholder.svg?height=200&width=200",
      deskripsi: "Mengajar matematika untuk tingkat MTs dan MA",
    },
    {
      id: 8,
      nama: "Ibu Siti Nurhaliza, S.Pd",
      jabatan: "Guru Bahasa Indonesia",
      foto: "/placeholder.svg?height=200&width=200",
      deskripsi: "Mengajar bahasa Indonesia dan sastra",
    },
  ])

  const [osisPutra, setOsisPutra] = useState<PersonData[]>([
    {
      id: 9,
      nama: "Ahmad Fauzan",
      jabatan: "Ketua OSIS",
      kelas: "MA 3",
      foto: "/placeholder.svg?height=200&width=200",
      deskripsi: "Memimpin organisasi siswa putra",
    },
    {
      id: 10,
      nama: "Muhammad Rizki",
      jabatan: "Wakil Ketua",
      kelas: "MA 3",
      foto: "/placeholder.svg?height=200&width=200",
      deskripsi: "Membantu ketua dalam menjalankan organisasi",
    },
  ])

  const [osisPutri, setOsisPutri] = useState<PersonData[]>([
    {
      id: 11,
      nama: "Aisyah Nur Fadilah",
      jabatan: "Ketua OSIS",
      kelas: "MA 3",
      foto: "/placeholder.svg?height=200&width=200",
      deskripsi: "Memimpin organisasi siswa putri",
    },
    {
      id: 12,
      nama: "Fatimah Zahra",
      jabatan: "Wakil Ketua",
      kelas: "MA 3",
      foto: "/placeholder.svg?height=200&width=200",
      deskripsi: "Membantu ketua dalam menjalankan organisasi",
    },
  ])

  const [editingItem, setEditingItem] = useState<PersonData | null>(null)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [addCategory, setAddCategory] = useState<string>("")
  const [newItem, setNewItem] = useState<Omit<PersonData, "id">>({
    nama: "",
    jabatan: "",
    foto: "/placeholder.svg?height=200&width=200",
    deskripsi: "",
    kelas: "",
  })

  const [uploadingImage, setUploadingImage] = useState<number | null>(null)

  const getDataByCategory = (category: string) => {
    switch (category) {
      case "pengurus":
        return pengurusPondok
      case "guru-ngaji":
        return guruNgaji
      case "guru-kelas":
        return guruKelas
      case "osis-putra":
        return osisPutra
      case "osis-putri":
        return osisPutri
      default:
        return []
    }
  }

  const setDataByCategory = (category: string, data: PersonData[]) => {
    switch (category) {
      case "pengurus":
        setPengurusPondok(data)
        break
      case "guru-ngaji":
        setGuruNgaji(data)
        break
      case "guru-kelas":
        setGuruKelas(data)
        break
      case "osis-putra":
        setOsisPutra(data)
        break
      case "osis-putri":
        setOsisPutri(data)
        break
    }
  }

  const handleEdit = (item: PersonData, category: string) => {
    setEditingItem({ ...item })
    setEditingCategory(category)
  }

  const handleSave = () => {
    if (editingItem && editingCategory) {
      const currentData = getDataByCategory(editingCategory)
      const updatedData = currentData.map((item) => (item.id === editingItem.id ? editingItem : item))
      setDataByCategory(editingCategory, updatedData)
      setEditingItem(null)
      setEditingCategory(null)
    }
  }

  const handleDelete = (id: number, category: string) => {
    const currentData = getDataByCategory(category)
    const updatedData = currentData.filter((item) => item.id !== id)
    setDataByCategory(category, updatedData)
  }

  const handleAdd = () => {
    if (newItem.nama && newItem.jabatan && addCategory) {
      const currentData = getDataByCategory(addCategory)
      const itemWithId = { ...newItem, id: Date.now() }
      setDataByCategory(addCategory, [...currentData, itemWithId])
      setNewItem({
        nama: "",
        jabatan: "",
        foto: "/placeholder.svg?height=200&width=200",
        deskripsi: "",
        kelas: "",
      })
      setShowAddForm(false)
      setAddCategory("")
    }
  }

  const handleImageUpload = (file: File, itemId: number, category: string) => {
    if (file && file.type.startsWith("image/")) {
      setUploadingImage(itemId)
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        const currentData = getDataByCategory(category)
        const updatedData = currentData.map((item) => (item.id === itemId ? { ...item, foto: imageUrl } : item))
        setDataByCategory(category, updatedData)
        setUploadingImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const renderPersonCard = (person: PersonData, category: string, showClass = false) => (
    <Card key={person.id} className="border-green-200 hover:shadow-lg transition-shadow">
      <CardHeader className="text-center">
        <div className="relative mx-auto mb-4">
          <Image
            src={person.foto || "/placeholder.svg"}
            alt={person.nama}
            width={200}
            height={200}
            className="rounded-full object-cover mx-auto w-32 h-32"
          />
          {isAdmin && (
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleImageUpload(file, person.id, category)
                }}
                className="hidden"
                id={`upload-org-${person.id}`}
              />
              <label htmlFor={`upload-org-${person.id}`} className="text-white cursor-pointer">
                📷 Ganti Foto
              </label>
            </div>
          )}
          {uploadingImage === person.id && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
              <span className="text-white text-sm">Uploading...</span>
            </div>
          )}
        </div>
        {editingItem?.id === person.id ? (
          <div className="space-y-2">
            <Input
              value={editingItem.nama}
              onChange={(e) => setEditingItem({ ...editingItem, nama: e.target.value })}
              placeholder="Nama"
            />
            <Input
              value={editingItem.jabatan}
              onChange={(e) => setEditingItem({ ...editingItem, jabatan: e.target.value })}
              placeholder="Jabatan"
            />
            {showClass && (
              <Input
                value={editingItem.kelas || ""}
                onChange={(e) => setEditingItem({ ...editingItem, kelas: e.target.value })}
                placeholder="Kelas"
              />
            )}
            <Input
              value={editingItem.foto}
              onChange={(e) => setEditingItem({ ...editingItem, foto: e.target.value })}
              placeholder="URL Foto"
            />
          </div>
        ) : (
          <>
            <CardTitle className="text-green-800">{person.nama}</CardTitle>
            <Badge className="bg-green-100 text-green-800 w-fit mx-auto">
              <Crown className="w-4 h-4 mr-1" />
              {person.jabatan}
            </Badge>
            {showClass && person.kelas && (
              <Badge variant="outline" className="w-fit mx-auto">
                {person.kelas}
              </Badge>
            )}
          </>
        )}
        {isAdmin && (
          <div className="flex justify-center gap-2 mt-2">
            {editingItem?.id === person.id ? (
              <>
                <Button size="sm" onClick={handleSave} className="bg-green-700 hover:bg-green-800">
                  <Save className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => setEditingItem(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="outline" onClick={() => handleEdit(person, category)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(person.id, category)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {editingItem?.id === person.id ? (
          <Textarea
            value={editingItem.deskripsi}
            onChange={(e) => setEditingItem({ ...editingItem, deskripsi: e.target.value })}
            placeholder="Deskripsi"
            rows={3}
          />
        ) : (
          <p className="text-gray-700 text-center">{person.deskripsi}</p>
        )}
      </CardContent>
    </Card>
  )

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Struktur Organisasi</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Struktur organisasi dan kepengurusan Pondok Pesantren DARUL HIKAM yang mengelola seluruh kegiatan pendidikan
            dan pembinaan santri.
          </p>
        </div>

        {/* Add Form */}
        {showAddForm && isAdmin && (
          <Card className="mb-8 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Tambah Anggota Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Nama"
                  value={newItem.nama}
                  onChange={(e) => setNewItem({ ...newItem, nama: e.target.value })}
                />
                <Input
                  placeholder="Jabatan"
                  value={newItem.jabatan}
                  onChange={(e) => setNewItem({ ...newItem, jabatan: e.target.value })}
                />
                {(addCategory === "osis-putra" || addCategory === "osis-putri") && (
                  <Input
                    placeholder="Kelas"
                    value={newItem.kelas || ""}
                    onChange={(e) => setNewItem({ ...newItem, kelas: e.target.value })}
                  />
                )}
                <Input
                  placeholder="URL Foto"
                  value={newItem.foto}
                  onChange={(e) => setNewItem({ ...newItem, foto: e.target.value })}
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
                    className="text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <Textarea
                    placeholder="Deskripsi"
                    value={newItem.deskripsi}
                    onChange={(e) => setNewItem({ ...newItem, deskripsi: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2 flex gap-2">
                  <Button onClick={handleAdd} className="bg-green-700 hover:bg-green-800">
                    <Save className="w-4 h-4 mr-2" />
                    Simpan
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    <X className="w-4 h-4 mr-2" />
                    Batal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="pengurus" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="pengurus">Pengurus</TabsTrigger>
            <TabsTrigger value="guru">Guru</TabsTrigger>
            <TabsTrigger value="osis">OSIS</TabsTrigger>
            <TabsTrigger value="struktur">Struktur</TabsTrigger>
          </TabsList>

          <TabsContent value="pengurus">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-green-800">Pengurus Pondok</h2>
              {isAdmin && (
                <Button
                  onClick={() => {
                    setAddCategory("pengurus")
                    setShowAddForm(true)
                  }}
                  className="bg-green-700 hover:bg-green-800"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Pengurus
                </Button>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {pengurusPondok.map((pengurus) => renderPersonCard(pengurus, "pengurus"))}
            </div>
          </TabsContent>

          <TabsContent value="guru">
            <Tabs defaultValue="guru-ngaji" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="guru-ngaji">Guru Ngaji</TabsTrigger>
                <TabsTrigger value="guru-kelas">Guru Kelas</TabsTrigger>
              </TabsList>

              <TabsContent value="guru-ngaji">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-green-800">Guru Ngaji</h3>
                  {isAdmin && (
                    <Button
                      onClick={() => {
                        setAddCategory("guru-ngaji")
                        setShowAddForm(true)
                      }}
                      className="bg-green-700 hover:bg-green-800"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Guru
                    </Button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {guruNgaji.map((guru) => renderPersonCard(guru, "guru-ngaji"))}
                </div>
              </TabsContent>

              <TabsContent value="guru-kelas">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-green-800">Guru Kelas</h3>
                  {isAdmin && (
                    <Button
                      onClick={() => {
                        setAddCategory("guru-kelas")
                        setShowAddForm(true)
                      }}
                      className="bg-green-700 hover:bg-green-800"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Guru
                    </Button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {guruKelas.map((guru) => renderPersonCard(guru, "guru-kelas"))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="osis">
            <Tabs defaultValue="osis-putra" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="osis-putra">OSIS Putra</TabsTrigger>
                <TabsTrigger value="osis-putri">OSIS Putri</TabsTrigger>
              </TabsList>

              <TabsContent value="osis-putra">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-green-800">Pengurus OSIS Putra</h3>
                  {isAdmin && (
                    <Button
                      onClick={() => {
                        setAddCategory("osis-putra")
                        setShowAddForm(true)
                      }}
                      className="bg-green-700 hover:bg-green-800"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Anggota
                    </Button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {osisPutra.map((anggota) => renderPersonCard(anggota, "osis-putra", true))}
                </div>
              </TabsContent>

              <TabsContent value="osis-putri">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-green-800">Pengurus OSIS Putri</h3>
                  {isAdmin && (
                    <Button
                      onClick={() => {
                        setAddCategory("osis-putri")
                        setShowAddForm(true)
                      }}
                      className="bg-green-700 hover:bg-green-800"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Anggota
                    </Button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {osisPutri.map((anggota) => renderPersonCard(anggota, "osis-putri", true))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="struktur">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 text-center">Bagan Struktur Organisasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Struktur Organisasi"
                    width={800}
                    height={600}
                    className="mx-auto rounded-lg shadow-md"
                  />
                  {isAdmin && (
                    <Button className="mt-4 bg-green-700 hover:bg-green-800">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Struktur
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
