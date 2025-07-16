"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Save, X, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

interface HomeProps {
  isAdmin: boolean
}

interface TimelineItem {
  id: number
  year: string
  title: string
  description: string
  image: string
}

export function Home({ isAdmin }: HomeProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [timeline, setTimeline] = useState<TimelineItem[]>([
    {
      id: 1,
      year: "1994",
      title: "Pendirian Pondok Pesantren",
      description:
        "Pondok Pesantren DARUL HIKAM didirikan oleh KH. Ahmad Dahlan dengan visi membentuk generasi Qur'ani.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      year: "2000",
      title: "Pembangunan Masjid Utama",
      description: "Pembangunan masjid utama yang dapat menampung 1000 jamaah untuk kegiatan ibadah dan pembelajaran.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      year: "2005",
      title: "Pendirian Madrasah Tsanawiyah",
      description: "Membuka jenjang pendidikan MTs untuk melayani santri tingkat menengah pertama.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      year: "2010",
      title: "Pendirian Madrasah Aliyah",
      description: "Membuka jenjang pendidikan MA untuk melayani santri tingkat menengah atas.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 5,
      year: "2015",
      title: "Pendirian SMK Darul Hikam",
      description: "Membuka SMK dengan berbagai jurusan untuk membekali santri dengan keterampilan praktis.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 6,
      year: "2020",
      title: "Era Digital",
      description: "Mengintegrasikan teknologi digital dalam pembelajaran dan manajemen pesantren.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ])

  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null)
  const [newItem, setNewItem] = useState<Omit<TimelineItem, "id">>({
    year: "",
    title: "",
    description: "",
    image: "/placeholder.svg?height=300&width=400",
  })
  const [showAddForm, setShowAddForm] = useState(false)
  const [uploadingImage, setUploadingImage] = useState<number | null>(null)

  const handleEdit = (item: TimelineItem) => {
    setEditingItem({ ...item })
  }

  const handleSave = () => {
    if (editingItem) {
      setTimeline(timeline.map((item) => (item.id === editingItem.id ? editingItem : item)))
      setEditingItem(null)
    }
  }

  const handleDelete = (id: number) => {
    setTimeline(timeline.filter((item) => item.id !== id))
  }

  const handleAdd = () => {
    if (newItem.year && newItem.title && newItem.description) {
      setTimeline([...timeline, { ...newItem, id: Date.now() }])
      setNewItem({
        year: "",
        title: "",
        description: "",
        image: "/placeholder.svg?height=300&width=400",
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
        setTimeline(timeline.map((item) => (item.id === itemId ? { ...item, image: imageUrl } : item)))
        setUploadingImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-green-800 mb-4 sm:mb-6 leading-tight">
            Selamat Datang di
            <span className="block text-green-600 mt-2">PONDOK PESANTREN DARUL HIKAM</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
            Lembaga pendidikan Islam terpadu yang telah berdiri sejak 1994, berkomitmen membentuk generasi yang
            berakhlak mulia, cerdas, dan berwawasan global.
          </p>
        </div>

        {/* Sejarah Singkat */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800 text-center mb-8 sm:mb-12">Sejarah Singkat</h2>
          <div className="max-w-5xl mx-auto">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-center px-4">
              Pondok Pesantren DARUL HIKAM didirikan pada tahun 1994 oleh KH. Ahmad Dahlan dengan visi untuk menciptakan
              lembaga pendidikan Islam yang mampu menghasilkan generasi yang memiliki keseimbangan antara ilmu agama dan
              ilmu umum. Dengan motto "Membentuk Generasi Qur'ani", pesantren ini telah berkembang menjadi salah satu
              lembaga pendidikan Islam terkemuka di Indonesia.
            </p>
          </div>
        </div>

        {/* Timeline Perjalanan */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800">Perjalanan Dari Tahun ke Tahun</h2>
            {isAdmin && (
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-green-700 hover:bg-green-800 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Timeline
              </Button>
            )}
          </div>

          {/* Add Form */}
          {showAddForm && isAdmin && (
            <Card className="mb-6 sm:mb-8 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 text-lg sm:text-xl">Tambah Timeline Baru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Tahun"
                    value={newItem.year}
                    onChange={(e) => setNewItem({ ...newItem, year: e.target.value })}
                    className="text-base"
                  />
                  <Input
                    placeholder="Judul"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="text-base"
                  />
                  <div className="sm:col-span-2">
                    <Textarea
                      placeholder="Deskripsi"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      className="text-base min-h-[100px]"
                    />
                  </div>
                  <Input
                    placeholder="URL Gambar"
                    value={newItem.image}
                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
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
                            setNewItem({ ...newItem, image: e.target?.result as string })
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

          <div className="space-y-8 sm:space-y-12">
            {timeline.map((item, index) => (
              <Card key={item.id} className="overflow-hidden border-green-200 shadow-lg">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                >
                  <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-48 sm:h-64 lg:h-full object-cover"
                    />
                    {isAdmin && (
                      <div className="absolute bottom-2 left-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleImageUpload(file, item.id)
                          }}
                          className="hidden"
                          id={`upload-${item.id}`}
                        />
                        <label
                          htmlFor={`upload-${item.id}`}
                          className="bg-white/90 hover:bg-white text-green-800 px-2 py-1 rounded text-xs cursor-pointer flex items-center gap-1 touch-manipulation"
                        >
                          📷 Ganti Foto
                        </label>
                        {uploadingImage === item.id && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                            <span className="text-white text-sm">Uploading...</span>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg font-bold text-lg sm:text-xl">
                      {editingItem?.id === item.id ? (
                        <Input
                          value={editingItem.year}
                          onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                          className="w-16 sm:w-20 text-center bg-white text-green-800 text-lg font-bold"
                        />
                      ) : (
                        item.year
                      )}
                    </div>
                  </div>
                  <div
                    className={`p-4 sm:p-6 lg:p-8 flex flex-col justify-center ${index % 2 === 1 ? "lg:col-start-1" : ""}`}
                  >
                    <CardHeader className="p-0 mb-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <CardTitle className="text-xl sm:text-2xl text-green-800 flex-1">
                          {editingItem?.id === item.id ? (
                            <Input
                              value={editingItem.title}
                              onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                              className="text-xl sm:text-2xl font-bold"
                            />
                          ) : (
                            item.title
                          )}
                        </CardTitle>
                        {isAdmin && (
                          <div className="flex gap-2 w-full sm:w-auto">
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
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEdit(item)}
                                  className="flex-1 sm:flex-none"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDelete(item.id)}
                                  className="text-red-600 hover:text-red-700 flex-1 sm:flex-none"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      {editingItem?.id === item.id ? (
                        <Textarea
                          value={editingItem.description}
                          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                          rows={4}
                          className="text-base min-h-[100px]"
                        />
                      ) : (
                        <p className="text-gray-700 leading-relaxed text-base">{item.description}</p>
                      )}
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 sm:mt-16 bg-green-100 rounded-lg p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-4">Bergabunglah dengan Keluarga Besar Kami</h3>
          <p className="text-gray-700 mb-6 text-base sm:text-lg">
            Daftarkan putra-putri Anda untuk menjadi bagian dari generasi Qur'ani yang berakhlak mulia.
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="bg-green-700 hover:bg-green-800 w-full sm:w-auto px-8 py-3 text-base">
              Daftar Santri Baru
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
